import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {AuthService} from 'src/auth/auth.service';

export interface IPayload {
  sub: number;
  iat: Date;
  exp: number;
}

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: IPayload, done): Promise<any> {
    const user = await this.authService.tokenValidateUser(payload.sub);
    if (!user) {
      const errorText = '존재하지 않는 유저입니다.';
      return done(
        new HttpException(
          {
            error: errorText,
            message: errorText,
          },
          HttpStatus.UNAUTHORIZED,
        ),
        false,
      );
    }

    return done(null, user);
  }
}
