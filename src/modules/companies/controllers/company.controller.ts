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
import { CompanyService } from '../services/company.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos/company.dto';
import { SkipAuth } from '@/modules/auth/common/jwt.decorator';

@ApiTags('Companies')
@Controller('companies')
@SkipAuth()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới công ty' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả công ty' })
  findAll() {
    return this.companyService.list();
  }

  @Get('top')
  @ApiOperation({ summary: 'Lấy danh sách top các công ty' })
  getTopCompanies() {
    return this.companyService.getTopCompanies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết công ty' })
  findOne(@Param('id') id: number) {
    return this.companyService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin công ty' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateOneBy({ id }, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa công ty' })
  remove(@Param('id') id: number) {
    return this.companyService.softDeleteById(id);
  }
}
