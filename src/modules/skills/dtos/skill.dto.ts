import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SKILL_LEVEL } from '@/modules/skills/enums/skill.enum';

export class CreateSkillDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsEnum(SKILL_LEVEL)
  level?: SKILL_LEVEL;
}

export class UpdateSkillDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsEnum(SKILL_LEVEL)
  level?: SKILL_LEVEL;
}
