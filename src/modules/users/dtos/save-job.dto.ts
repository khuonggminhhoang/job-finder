import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaveJobDto {
  @ApiProperty({ description: 'Job ID to save', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  jobId: number;
} 