import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { JobCategoryService } from '../services/job-category.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateJobCategoryDto,
  UpdateJobCategoryDto,
} from '@/modules/job-categories/dtos/job-category.dto';
import { SkipAuth } from '@/modules/auth/common/jwt.decorator';

@ApiTags('Job Categories')
@Controller('job-categories')
@SkipAuth()
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới new job category' })
  create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryService.create(createJobCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả job categories' })
  findAll() {
    return this.jobCategoryService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết một job category' })
  findOne(@Param('id') id: number) {
    return this.jobCategoryService.getOne({
      where: { id },
      relations: ['jobs'],
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật một job category' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoryService.updateOneBy({ id }, updateJobCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa một job category' })
  remove(@Param('id') id: number) {
    return this.jobCategoryService.softDeleteById(id);
  }
}
