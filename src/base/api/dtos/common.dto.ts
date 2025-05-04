import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { GreaterThanOrEqual } from '@/base/validators/custom-validator.decorator';

export class DateTimeRangeDto {
  @ApiPropertyOptional({ example: '2025-01-01T00:00:00Z' })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @Length(10)
  fromDate?: string;

  @ApiPropertyOptional({ example: '2025-12-31T23:59:59Z' })
  @IsOptional()
  @IsNotEmpty()
  @GreaterThanOrEqual('fromDate')
  @Length(10)
  @IsDateString()
  toDate?: string;
}

export class DateRangeDto {
  @ApiProperty({ example: '2025-01-01' })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @Length(10, 10)
  fromDate?: string;

  @ApiProperty({ example: '2025-12-31' })
  @IsOptional()
  @IsNotEmpty()
  @GreaterThanOrEqual('fromDate')
  @IsDateString()
  @Length(10, 10)
  toDate?: string;
}

export class DateTimeRangeFilterDto {
  @ApiPropertyOptional({ example: '2025-01-01T00:00:00Z' })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @Length(10)
  fromDate_gte?: string;

  @ApiPropertyOptional({ example: '2025-12-31T23:59:59Z' })
  @IsOptional()
  @IsNotEmpty()
  @GreaterThanOrEqual('fromDate_gte')
  @IsDateString()
  @Length(10)
  toDate_lte?: string;
}

export class PhotoBodyDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  @IsOptional()
  photoFile: string;
}
