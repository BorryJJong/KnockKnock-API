import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from '../../users/users.repository';
import {IPayload} from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: IPayload) {
    const user = await this.userRepository.findUserByIdWithoutPassword(
      payload.sub,
    );

    if (!user) throw new UnauthorizedException('접근 오류');
    return user;
  }
}
