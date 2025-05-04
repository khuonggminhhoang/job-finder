import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from '@/config/config.service';
import { IJwtPayload } from '@/modules/auth/interfaces/IJwtPayload';
import { JwtAuthService } from '@/modules/auth/services/jwt.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private jwtAuthService: JwtAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.ACCESS_TOKEN_SECRET,
      passReqToCallback: false,
    });
  }

  async validate(payload: IJwtPayload) {
    return await this.jwtAuthService.authenticate(payload);
  }
}
