import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseException, UnauthorizedException } from '@/base/exceptions';
import { IS_PUBLIC_KEY } from '@/modules/auth/common/jwt.decorator';
import { isInstance } from 'class-validator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest<T>(err: any, user: T): T {
    if (err || !user) {
      if (isInstance(err, BaseException)) {
        throw err;
      }
      throw new UnauthorizedException({ error: 'JWT.AUTH_FAIL' });
    }
    return user;
  }
}
