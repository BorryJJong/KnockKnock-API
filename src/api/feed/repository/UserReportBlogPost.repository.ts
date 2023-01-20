import {Injectable} from '@nestjs/common';
import {EntityRepository, Repository} from 'typeorm';
import {UserReportBlogPost} from '@entities/UserReportBlogPost';

@Injectable()
@EntityRepository(UserReportBlogPost)
export class UserReportBlogPostRepository extends Repository<UserReportBlogPost> {
  async insertUserReportBlogPost(
    userId: number,
    postId: number,
    contents: string,
  ): Promise<void> {
    await this.createQueryBuilder('userReportBlogPost')
      .insert()
      .into(UserReportBlogPost)
      .values({
        userId,
        postId,
        contents,
      })
      .execute();
  }
}
