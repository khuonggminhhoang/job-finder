import {
  IS_PHONE_NUMBER,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty, ApiPropertyOptional,
  IntersectionType,
  PartialType,
} from '@nestjs/swagger';
import {
  ToLowerCase,
  TransformDate,
  TransformNumber,
  Trim,
} from '@/base/validators/validator.transformer';
import { ImageEntity } from '@/modules/images/entities/image.entity';
import { CurrencyEntity } from '@/modules/currencies/entities/currency.entity';
import { PhotoBodyDto } from '@/base/api/dtos/common.dto';
import { Type } from 'class-transformer';

export class LoginAuthDto {
  @ApiProperty({ example: 'khuonghm' })
  @IsString()
  @Trim()
  @ToLowerCase()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(6)
  @MaxLength(257)
  username?: string;

  @ApiProperty({ example: 'minhkhuong782k3@gmail.com' })
  @IsEmail()
  @Trim()
  @IsOptional()
  @ToLowerCase()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(257)
  email?: string;

  @ApiProperty({ example: 'khuonghm' })
  @IsString()
  @Trim()
  @IsOptional()
  @ToLowerCase()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(257)
  emailOrUsername: string;

  @ApiProperty({ example: '123123123' })
  @IsNotEmpty()
  @Trim()
  @ToLowerCase()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}

export class RegisterAuthDto {
  @ApiProperty({ example: 'minhkhuong782k3@gmail.com' })
  @IsEmail()
  @Trim()
  @ToLowerCase()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(257)
  email: string;

  @ApiProperty({ example: 'khuonghm' })
  @IsString()
  @Trim()
  @ToLowerCase()
  @MinLength(6)
  @MaxLength(257)
  username: string;

  @ApiProperty({ example: '123123123' })
  @IsNotEmpty()
  @MinLength(8)
  @Trim()
  @ToLowerCase()
  @MaxLength(30)
  password: string;

  @ApiProperty({ example: '2003-08-07' })
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  @IsOptional()
  dob?: string | Date;

  @ApiProperty({ example: 'Khương' })
  @IsString()
  @Trim()
  @IsNotEmpty()
  @MaxLength(30)
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Hoàng Minh' })
  @IsString()
  @Trim()
  @IsNotEmpty()
  @MaxLength(30)
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '0377476212' })
  @IsNotEmpty()
  @Trim()
  @MinLength(10)
  @MaxLength(12)
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Trim()
  @IsOptional()
  googleId?: string;
}

export class EmailUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  @Trim()
  @ToLowerCase()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(257)
  email: string;
}

export class SetPasswordDto {
  @ApiProperty({ example: '123123123' })
  @Trim()
  @ToLowerCase()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  newPassword: string;
}

export class ResetPasswordDto extends SetPasswordDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @Trim()
  token: string;
}

export class UserDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @Trim()
  firstName: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @Trim()
  lastName: string;

  @ApiProperty()
  @TransformDate()
  @IsDateString()
  @IsNotEmpty()
  @Trim()
  dob: Date;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Matches(/^\d{10,11}$/, { message: 'Phone number must be 10-11 digits' })
  @IsPhoneNumber('VN', { message: 'Invalid Vietnamese phone number' })
  phoneNumber: string;
}

export class UpdateProfileUserDto extends PartialType(
  IntersectionType(UserDto, PhotoBodyDto),
) {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  imageId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  currencyId?: number;

  @ApiHideProperty()
  @IsOptional()
  image?: ImageEntity;

  @ApiHideProperty()
  @IsOptional()
  currency?: CurrencyEntity;
}
