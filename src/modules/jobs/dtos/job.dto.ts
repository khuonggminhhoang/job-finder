import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  JOB_STATUS,
  JOB_TYPE,
  SALARY_PERIOD,
} from '@/modules/jobs/enums/job.enum';
import { QuerySpecificationDto } from '@/base/api/dtos/query-specification.dto';
import { GreaterThan, GreaterThanOrEqual } from '@/base/validators/custom-validator.decorator';

export class JobDto {
  @ApiProperty({ description: 'Company ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @ApiProperty({ description: 'Category ID', example: 1, required: false })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: 'Job title',
    example: 'Senior Software Engineer',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Job description',
    example: 'We are looking for a Senior Software Engineer...',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Job location', example: 'Ho Chi Minh City' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Minimum salary',
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @Min(0)
  salaryMin?: number;

  @ApiProperty({
    description: 'Maximum salary',
    example: 2000,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @Min(0)
  salaryMax?: number;

  @ApiProperty({
    description: 'Salary period',
    example: SALARY_PERIOD.MONTH,
    enum: SALARY_PERIOD,
  })
  @IsOptional()
  @IsString()
  salaryPeriod?: SALARY_PERIOD;

  @ApiProperty({ description: 'Job type', example: JOB_TYPE.FULL_TIME })
  @IsNotEmpty()
  @IsString()
  jobType: JOB_TYPE;

  @ApiProperty({
    description: 'Whether job is a top job',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isTopJob?: boolean;

  @ApiProperty({
    description: 'Job status',
    enum: JOB_STATUS,
    example: JOB_STATUS.OPEN,
  })
  @IsOptional()
  @IsString()
  status?: JOB_STATUS;
}

export class CreateJobDto extends JobDto {}
export class UpdateJobDto extends PartialType(CreateJobDto) {}

export class FilterJobDto extends QuerySpecificationDto<any> {
  @ApiPropertyOptional({ example: 'Hà nội' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  jobCategoryId?: number;

  @ApiPropertyOptional({ example: 5000000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  salaryGte?: number;

  @ApiPropertyOptional({ example: 10000000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @GreaterThanOrEqual('salaryGte')
  salaryLte?: number;
}
