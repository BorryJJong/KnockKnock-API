import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LikeService} from './like.service';
import {LikeController} from './like.controller';
import {BlogLikeRepository} from './repository/like.repository';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';
import {UserRepository} from 'src/api/users/users.repository';
import {KakaoService} from 'src/auth/kakao.service';
import {LikeValidator} from 'src/api/like/like.validator';
import {ImageService} from 'src/api/image/image.service';
import {UsersService} from 'src/api/users/users.service';
import {ConfigService} from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([BlogLikeRepository, UserRepository])],
  controllers: [LikeController],
  providers: [
    LikeService,
    JwtGuard,
    KakaoService,
    LikeValidator,
    UsersService,
    ImageService,
    ConfigService,
  ],
})
export class LikeModule {}
