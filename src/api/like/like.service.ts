import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BlogLikeRepository} from './repository/feed.repository';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(BlogLikeRepository)
    private blogLikeRepository: BlogLikeRepository,
  ) {}

  async feedLike(id: number, userId: number): Promise<boolean> {
    await this.blogLikeRepository.insertFeedLike(id, userId);
    return true;
  }

  async feedUnLike(id: number, userId: number): Promise<boolean> {
    await this.blogLikeRepository.deleteFeedLike(id, userId);
    return true;
  }
}
