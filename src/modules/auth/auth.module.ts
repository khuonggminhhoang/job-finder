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

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtAuthModule,
    OtpModule,
    MailModule,
  ],
  controllers: [AuthPublicController, AuthPrivateController],
  providers: [AuthService, UserService],
  exports: [AuthService, UserService],
})
export class AuthModule {}
