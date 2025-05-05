import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@/modules/auth/services/auth.service';
import {
  EmailUserDto,
  LoginAuthDto,
  RegisterAuthDto,
  ResetPasswordDto, SetPasswordDto,
} from '@/modules/users/dtos/user.dto';
import { SkipAuth, UserAuth } from '@/modules/auth/common/jwt.decorator';
import { ApiBearerAndTags } from '@/base/swagger/swagger.decorator';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { JwtAuthGuard } from '@/modules/auth/common/jwt.guard';
import { JwtRefreshGuard } from '@/modules/auth/common/jwt-refresh.guard';
import { VerifyOtpDto } from '@/modules/auth/dtos/auth.dto';

@ApiTags('Auth - Xác thực')
@SkipAuth()
@Controller('auth')
export class AuthPublicController {
  constructor(private readonly authService: AuthService) {}

  // AUTH
  @Post('/register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Đăng nhập hệ thống' })
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/reset-password')
  @ApiOperation({ summary: 'Reset mật khẩu cho tài khoản' })
  resetPassword(@Body() dto: SetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('/forgot-password')
  @ApiOperation({ summary: 'Quên mật khẩu tài khoản' })
  forgotPassword(@Body() dto: EmailUserDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('/verify-otp')
  @ApiOperation({ summary: 'Xác thực OTP' })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Lấy lại access token mới' })
  @Post('/refresh-token')
  refreshToken(@UserAuth() user: UserEntity) {
    return this.authService.refreshToken(user);
  }
}

@ApiBearerAndTags('Auth - Xác thực')
@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthPrivateController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Đăng xuất tài khoản' })
  @Post('/logout')
  logout(@UserAuth() user: UserEntity) {
    return this.authService.logout(user);
  }
}
