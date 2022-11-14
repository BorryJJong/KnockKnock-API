import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './users.repository';
import {AuthModule} from '../../auth/auth.module';
import {UserValidator} from 'src/api/users/users.validator';
import {KakaoService} from 'src/auth/kakao.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserValidator, KakaoService],
  exports: [UsersService],
})
export class UsersModule {}
