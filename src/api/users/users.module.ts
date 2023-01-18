import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './users.repository';
import {AuthModule} from '../../auth/auth.module';
import {UserValidator} from 'src/api/users/users.validator';
import {KakaoService} from 'src/auth/kakao.service';
import {AppleService} from 'src/auth/apple.service';
import {ImageService} from 'src/api/image/image.service';
import {ConfigService} from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserValidator,
    KakaoService,
    AppleService,
    ImageService,
    ConfigService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
