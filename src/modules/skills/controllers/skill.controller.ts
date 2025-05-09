import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillService } from '../services/skill.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBearerAndTags } from '@/base/swagger/swagger.decorator';
import { CreateSkillDto, UpdateSkillDto } from '../dtos/skill.dto';
import { UserAuth } from '@/modules/auth/common/jwt.decorator';

@ApiBearerAndTags('Skills user')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả kỹ năng của user hiện tại' })
  findAll() {
    return this.skillService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết kỹ năng' })
  findOne(@Param('id') id: number, @UserAuth('id') userId: number) {
    return this.skillService.getOneBy({ id, userId });
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới một kỹ năng' })
  create(@Body() dto: CreateSkillDto, @UserAuth('id') userId: number) {
    return this.skillService.create({ ...dto, userId });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật một kỹ năng' })
  update(@Param('id') id: number, @Body() dto: UpdateSkillDto) {
    return this.skillService.updateOneBy({ id }, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa một kỹ năng' })
  remove(@Param('id') id: number) {
    return this.skillService.softDeleteById(id);
  }
}
