import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtAuthService } from '@/modules/auth/services/jwt.service';
import { config } from '@/config/config.service';
import { IJwtPayload } from '@/modules/auth/interfaces/IJwtPayload';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly jwtAuthService: JwtAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: config.REFRESH_TOKEN_SECRET,
      passReqToCallback: false,
    });
  }

  async validate(payload: IJwtPayload) {
    return this.jwtAuthService.authRefreshToken(payload);
  }
}
