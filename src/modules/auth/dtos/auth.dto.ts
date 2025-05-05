import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { EmailUserDto } from '@/modules/users/dtos/user.dto';
import { config } from '@/config/config.service';

const LENGTH_OTP = config.OTP_OPTION.digits;

export class SendTokenLinkDto extends EmailUserDto {
  @ApiProperty({ example: 'https://example.com' })
  @IsNotEmpty()
  prefix: string;
}

export class VerifyOtpDto extends EmailUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(LENGTH_OTP, LENGTH_OTP)
  otp: string;
}

export class LoginGoogleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  credential: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clientId: string;
}
