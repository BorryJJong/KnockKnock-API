import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LikeService} from './like.service';
import {LikeController} from './like.controller';
import {BlogLikeRepository} from './repository/feed.repository';
import {JwtAuthGuard} from 'src/auth/jwt/jwt.guard';
import {UsersService} from 'src/api/users/users.service';
import {UserRepository} from 'src/api/users/users.repository';
import {KakaoService} from 'src/auth/kakao.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogLikeRepository, UserRepository])],
  controllers: [LikeController],
  providers: [LikeService, JwtAuthGuard, UsersService, KakaoService],
})
export class LikeModule {}
