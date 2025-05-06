import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CompanyDto {
  @ApiProperty({ description: 'Company name', example: 'Tech Solutions Inc.' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL of company logo',
    example: 'https://example.com/logo.png',
  })
  @IsString()
  logoUrl: string;

  @ApiProperty({
    description: 'Company description',
    example: 'Leading technology solutions provider',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Company website',
    example: 'https://techsolutions.com',
  })
  @IsString()
  website: string;

  @ApiProperty({
    description: 'Company industry',
    example: 'Technology',
  })
  @IsString()
  industry: string;

  @ApiProperty({
    description: 'Company size',
    example: '100-500 employees',
  })
  @IsString()
  companySize: string;

  @ApiProperty({
    description: 'Company address',
    example: '123 Tech Street, Silicon Valley',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Whether company is a top company',
    example: false,
  })
  @IsBoolean()
  isTopCompany: boolean;
}

export class CreateCompanyDto extends CompanyDto {}
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
