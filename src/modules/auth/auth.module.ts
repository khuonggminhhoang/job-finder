import { Module } from '@nestjs/common';
import {
  AuthPrivateController,
  AuthPublicController,
} from '@/modules/auth/controllers/auth.controller';
import { AuthService } from '@/modules/auth/services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { UserService } from '@/modules/auth/services/user.service';
import { JwtAuthModule } from '@/modules/auth/jwt.module';
import { OtpModule } from '@/base/otp/otp.module';
import { MailModule } from '@/base/mail/mail.module';
import { ForgotPasswordService } from '@/modules/auth/services/forgot-password.service';
import { ForgotPasswordEntity } from '@/modules/auth/entities/forgot-password.entity';
import { GoogleService } from '@/base/google/google.service';
import { ImageEntity } from '@/modules/images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ForgotPasswordEntity, ImageEntity]),
    JwtAuthModule,
    OtpModule,
    MailModule,
  ],
  controllers: [AuthPublicController, AuthPrivateController],
  providers: [AuthService, UserService, ForgotPasswordService, GoogleService],
  exports: [AuthService, UserService],
})
export class AuthModule {}
