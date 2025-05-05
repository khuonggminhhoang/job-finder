import { Injectable } from '@nestjs/common';
import { JwtAuthService } from '@/modules/auth/services/jwt.service';
import {
  EmailUserDto,
  LoginAuthDto,
  RegisterAuthDto,
  SetPasswordDto,
} from '@/modules/users/dtos/user.dto';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { UserService } from '@/modules/auth/services/user.service';
import * as exc from '@/base/exceptions';
import { MailService } from '@/base/mail/mail.service';
import { BadRequestException } from '@/base/exceptions';
import { config } from '@/config/config.service';
import { OtpService } from '@/base/otp/otp.service';
import { VerifyOtpDto } from '@/modules/auth/dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}

  // auth
  async register(dto: RegisterAuthDto) {
    return this.userService.createUser(dto);
  }

  async login(dto: LoginAuthDto) {
    const {
      emailOrUsername,
      username = emailOrUsername,
      email = emailOrUsername,
      password,
    } = dto;
    const findOptions: Record<string, any>[] = [];
    if (email || emailOrUsername) findOptions.push({ email });
    if (username || emailOrUsername) findOptions.push({ username });
    const user = await this.userService.getUser(findOptions);

    if (!user) {
      throw new exc.BadRequestException({
        error: 'AUTH.USERNAME_OR_EMAIL_INCORRECT',
        message: 'Username or email incorrect',
      });
    }

    void user.refreshAuthVersion(true); // update uav after each login
    if (!user.comparePassword(password)) {
      throw new exc.BadRequestException({
        error: 'AUTH.PASSWORD_INCORRECT',
        message: 'Password incorrect',
      });
    }

    return this.getToken(user);
  }

  verifyOtp(dto: VerifyOtpDto) {
    const { otp, email } = dto;
    return {
      isVerified: this.otpService.verifyOTP(otp, email),
      email,
    };
  }

  async logout(user: UserEntity) {
    user.authVersion = 0;
    await user.save();
  }

  async resetPassword(dto: SetPasswordDto) {
    const { newPassword, email } = dto;
    const user = await this.userService.getUserOrThrow({ email });
    user.setPassword(newPassword);
    return user.save();
  }

  // token jwt
  getToken(user: UserEntity) {
    const accessToken: string = this.jwtAuthService.createAccessToken(user);
    const refreshToken: string = this.jwtAuthService.createRefreshToken(user);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    };
  }

  refreshToken(user: UserEntity) {
    const accessToken: string = this.jwtAuthService.createAccessToken(user);
    return {
      accessToken: accessToken,
      user: user,
    };
  }

  async forgotPassword(dto: EmailUserDto) {
    const user = await this.userService.getUserOrThrow({ email: dto.email });
    const otp = this.otpService.generateOTP(dto.email);
    await this.mailService.sendMail(
      dto.email,
      '[JOB_FINDER] Mapping your success - Verify account email',
      null,
      'change-password.hbs',
      {
        otp: otp,
        name: `${user.name}`,
        expiry: config.TOKEN_EXP,
      },
    );
  }
}
