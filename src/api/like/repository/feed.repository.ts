import {Injectable} from '@nestjs/common';
import {EntityRepository, Repository} from 'typeorm';
import {BlogLike} from '../../../entities/BlogLike';

@Injectable()
@EntityRepository(BlogLike)
export class BlogLikeRepository extends Repository<BlogLike> {
  async insertFeedLike(id: number, userId: number): Promise<boolean> {
    await this.manager.save(
      this.manager.create(BlogLike, {
        postId: id,
        userId,
      }),
    );
    return true;
  }

  async deleteFeedLike(id: number, userId: number): Promise<boolean> {
    await this.manager.delete(BlogLike, {postId: id, userId});
    return true;
  }
}
