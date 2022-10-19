import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {IPayload} from './jwt.payload';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: IPayload) {
    console.log('JWT strategy validate() payload:', payload);
    // const user = await this.userRepository.findUserByIdWithoutPassword(
    //   payload.sub,
    // );

    // if (!user) {
    //   throw new UnauthorizedException('접근 오류');
    // }

    // return user;
  }
}
