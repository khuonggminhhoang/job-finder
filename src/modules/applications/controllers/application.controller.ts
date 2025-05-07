import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UseFilters,
  UploadedFile,
} from '@nestjs/common';
import { ApplicationService } from '../services/application.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import {
  CreateApplicationDto,
  UpdateApplicationDto, UpdateStatusApplicationDto,
} from '../dtos/application.dto';
import { SkipAuth, UserAuth } from '@/modules/auth/common/jwt.decorator';
import { ApiBearerAndTags } from '@/base/swagger/swagger.decorator';
import { MulterErrorFilter } from '@/base/util/multer.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonAwsS3Service } from '@/modules/providers/aws/s3/aws-s3.service';
import { config } from '@/config/config.service';
import * as _ from 'lodash';

@ApiBearerAndTags('Applications - apply job')
@Controller('applications')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly s3Service: CommonAwsS3Service,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Nộp đơn ứng tuyển cho một công việc' })
  @UseFilters(MulterErrorFilter)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UserAuth('id') userId: number,
    @Body() dto: CreateApplicationDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const result = await this.s3Service.uploadByMulter(
        file,
        config.S3.PATH.uploadCV(userId),
      );
      const resumeUrl = result.uploadFile.path as string;
      _.assign(dto, { resumeUrl });
    }

    return this.applicationService.createApplication(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách đơn ứng tuyển của user hiện tại' })
  getUserApplications(@UserAuth('id') userId: number) {
    return this.applicationService.getUserApplications(userId);
  }

  @Get('job/:jobId')
  @SkipAuth()
  @ApiOperation({ summary: 'Lấy danh sách đơn ứng tuyển cho một công việc' })
  getJobApplications(@Param('jobId', ParseIntPipe) jobId: number) {
    return this.applicationService.getJobApplications(jobId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết một đơn ứng tuyển' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.getOne({
      where: { id },
      relations: ['user', 'job', 'job.company', 'job.category'],
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật trạng thái đơn ứng tuyển' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusApplicationDto,
  ) {
    return this.applicationService.updateOneBy({ id }, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đơn ứng tuyển' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.softDeleteById(id);
  }
}
