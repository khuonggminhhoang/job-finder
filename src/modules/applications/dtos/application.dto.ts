import {
  ApiHideProperty,
  ApiProperty,
  IntersectionType,
  PartialType,
} from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { APPLICATION_STATUS } from '@/modules/applications/enums/application.enum';
import { FileBodyDto } from '@/base/api/dtos/common.dto';
import { Type } from 'class-transformer';

export class ApplicationDto {
  @ApiProperty({ description: 'Job ID', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  jobId: number;

  @ApiProperty({
    description: 'Application status',
    enum: APPLICATION_STATUS,
    example: APPLICATION_STATUS.SUBMITTED,
  })
  @IsOptional()
  @IsEnum(APPLICATION_STATUS)
  status?: APPLICATION_STATUS;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @ApiProperty({
    description: 'Cover letter',
    example: 'I am writing to express my interest...',
    required: false,
  })
  @IsOptional()
  @IsString()
  coverLetter?: string;
}

export class CreateApplicationDto extends IntersectionType(
  ApplicationDto,
  FileBodyDto,
) {}
export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
export class UpdateStatusApplicationDto {
  @ApiProperty({
    description: 'Application status',
    enum: APPLICATION_STATUS,
    example: APPLICATION_STATUS.SUBMITTED,
  })
  @IsOptional()
  @IsEnum(APPLICATION_STATUS)
  status: APPLICATION_STATUS;
}
