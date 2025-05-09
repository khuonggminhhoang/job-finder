import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { ApplicationEntity } from '@/modules/applications/entities/application.entity';

export class NotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class CreateNotificationDto extends NotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  applicationId: number;

  @ApiHideProperty()
  @IsOptional()
  user?: UserEntity;

  @ApiHideProperty()
  @IsOptional()
  application?: ApplicationEntity;
}

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}
