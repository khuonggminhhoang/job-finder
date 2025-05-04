import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { IJwtPayload } from '@/modules/auth/interfaces/IJwtPayload';
import { config } from '@/config/config.service';
import { UserService } from '@/modules/auth/services/user.service';
import { UnauthorizedException } from '@/base/exceptions';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createAccessToken(user: UserEntity): string {
    const payload: IJwtPayload = {
      sub: user.email,
      uav: user.authVersion,
    };
    return this.jwtService.sign(payload);
  }

  createRefreshToken(user: UserEntity): string {
    const payload: IJwtPayload = {
      sub: user.email,
    };

    const option: JwtSignOptions = {
      secret: config.REFRESH_TOKEN_SECRET,
      expiresIn: config.REFRESH_TOKEN_EXP,
    };

    return this.jwtService.sign(payload, option);
  }

  async authenticate(payload: IJwtPayload) {
    const { sub, uav } = payload;
    const user = await this.userService.repository
      .createQueryBuilder()
      .where('email=:sub', { sub: sub })
      .getOne();
    if (user && user.authVersion != uav) {
      throw new UnauthorizedException({
        error: 'JWT.TOKEN_EXPIRED',
        message: 'Jwt token expired',
      });
    }
    return user;
  }

  async authRefreshToken(payload: IJwtPayload) {
    const { sub } = payload;
    const user = await this.userService.repository
      .createQueryBuilder()
      .where('email=:sub', { sub: sub })
      .getOne();
    return user;
  }
}
