import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LikeService} from './like.service';
import {LikeController} from './like.controller';
import {BlogLikeRepository} from './repository/feed.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogLikeRepository])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
