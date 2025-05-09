import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, Query,
} from '@nestjs/common';
import { JobService } from '../services/job.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateJobDto, UpdateJobDto } from '../dtos/job.dto';
import { SkipAuth } from '@/modules/auth/common/jwt.decorator';
import { SearchSpecificationDto } from '@/base/api/dtos/query-specification.dto';

@ApiTags('Jobs')
@Controller('jobs')
@SkipAuth()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới công việc' })
  create(@Body() dto: CreateJobDto) {
    return this.jobService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả công việc' })
  findAll(@Query() dto: SearchSpecificationDto) {
    return this.jobService.listWithPage(dto);
  }

  @Get('new')
  @ApiOperation({ summary: 'Lấy danh sách công việc mới trong 3 ngày gần đây' })
  getNewJobs() {
    return this.jobService.getNewJobs();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết công việc' })
  findOne(@Param('id') id: number) {
    return this.jobService.getOne({
      where: { id },
      relations: ['category', 'company'],
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin công việc' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.jobService.updateOneBy({ id }, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa công việc' })
  remove(@Param('id') id: number) {
    return this.jobService.softDeleteById(id);
  }
}
