import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobCategoryDto {
  @ApiProperty({ description: 'Name of the job category', example: 'Remote' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'URL of the category icon', example: 'https://example.com/icon.png', required: false })
  @IsOptional()
  @IsString()
  iconUrl?: string;
} 