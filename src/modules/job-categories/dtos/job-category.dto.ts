import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class JobCategoryDto {
  @ApiProperty({ description: 'Name of the job category', example: 'Remote' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL of the category icon',
    example: 'https://example.com/icon.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;
}

export class CreateJobCategoryDto extends JobCategoryDto {}
export class UpdateJobCategoryDto extends PartialType(JobCategoryDto) {}
