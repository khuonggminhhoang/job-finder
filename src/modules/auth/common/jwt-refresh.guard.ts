import { Injectable } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { BaseException, UnauthorizedException } from '@/base/exceptions';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  handleRequest<T>(err: any, user: T): T {
    if (err || !user) {
      if (isInstance(err, BaseException)) {
        throw err;
      }
      throw new UnauthorizedException({ error: 'JWT.REFRESH_AUTH_FAIL' });
    }
    return user;
  }
}
