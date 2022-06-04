import {forwardRef, Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {UsersModule} from '../users/users.module';
import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt', session: false}),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY,
      signOptions: {expiresIn: process.env.JWT_ACCESS_EXPIRED},
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
