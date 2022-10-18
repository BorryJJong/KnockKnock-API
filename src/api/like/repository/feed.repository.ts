import {Injectable} from '@nestjs/common';
import { GetFeedLikeDTO } from 'src/api/feed/dto/feed.dto';
import {EntityRepository, getManager, Repository} from 'typeorm';
import {BlogLike} from '../../../entities/BlogLike';
import {User} from '../../../entities/User';

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

  async getListFeedLike(postId: number): Promise<GetFeedLikeDTO[]> {
    const post: GetFeedLikeDTO[] = await getManager()
      .createQueryBuilder()
      .select('bl.id', 'id')
      .addSelect('bl.user_id', 'userId')
      .addSelect('u.nickname', 'userName')
      .addSelect('u.image', 'userImage')
      .from(BlogLike, 'bl')
      .innerJoin(User, 'u', 'bl.user_id = u.id')
      .where('bl.post_id = :postId', {postId: postId})
      .getRawMany();

    return post;
  }
}
