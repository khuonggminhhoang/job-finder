import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExperienceService } from '../services/experience.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBearerAndTags } from '@/base/swagger/swagger.decorator';
import {
  CreateExperienceDto,
  UpdateExperienceDto,
} from '../dtos/experience.dto';
import { UserAuth } from '@/modules/auth/common/jwt.decorator';

@ApiBearerAndTags('Experiences')
@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả kinh nghiệm của user hiện tại' })
  findAll() {
    return this.experienceService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết kinh nghiệm' })
  findOne(@Param('id') id: number, @UserAuth('id') userId: number) {
    return this.experienceService.getOneBy({ id, userId });
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới một kinh nghiệm' })
  create(@Body() dto: CreateExperienceDto, @UserAuth('id') userId: number) {
    return this.experienceService.create({ ...dto, userId });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật một kinh nghiệm' })
  update(@Param('id') id: number, @Body() dto: UpdateExperienceDto) {
    return this.experienceService.updateOneBy({ id }, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa một kinh nghiệm' })
  remove(@Param('id') id: number) {
    return this.experienceService.softDeleteById(id);
  }
}
