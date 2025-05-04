import { Module } from '@nestjs/common';
import { JwtAuthService } from '@/modules/auth/services/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { JwtAuthStrategy } from '@/modules/auth/common/jwt.strategy';
import { UserService } from '@/modules/auth/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.ACCESS_TOKEN_SECRET,
        signOptions: { expiresIn: config.ACCESS_TOKEN_EXP },
      }),
    }),
  ],
  providers: [JwtAuthService, JwtAuthStrategy, UserService],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
