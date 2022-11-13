import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from 'src/api/users/users.repository';
import {KakaoService} from 'src/auth/kakao.service';
import {AuthService} from './auth.service';
import {JwtAccessTokenStrategy} from './jwt/jwtAccessToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_ACCESS_SECRET,
      signOptions: {expiresIn: '60d'},
    }),
  ],
  providers: [
    AuthService,
    JwtAccessTokenStrategy,
    JwtAccessTokenStrategy,
    KakaoService,
    ConfigService,
  ],
  exports: [AuthService, KakaoService],
})
export class AuthModule {}
