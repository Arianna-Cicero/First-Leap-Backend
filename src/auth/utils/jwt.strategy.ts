import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { AuthService } from '../auth.service';
import { UtilizadorService } from '@src/resources/utilizador/utilizador.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private utiliadorService: UtilizadorService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.utiliadorService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
