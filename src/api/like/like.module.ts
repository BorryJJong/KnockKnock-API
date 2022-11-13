import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LikeService} from './like.service';
import {LikeController} from './like.controller';
import {BlogLikeRepository} from './repository/feed.repository';
import {JwtAuthGuard} from 'src/auth/jwt/jwt.guard';
import {UsersService} from 'src/api/users/users.service';
import {UserRepository} from 'src/api/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogLikeRepository, UserRepository])],
  controllers: [LikeController],
  providers: [LikeService, JwtAuthGuard, UsersService],
})
export class LikeModule {}
