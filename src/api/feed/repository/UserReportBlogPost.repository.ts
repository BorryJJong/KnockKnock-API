import {Injectable} from '@nestjs/common';
import {EntityRepository, Repository} from 'typeorm';
import {
  IUserReportBlogPost,
  UserReportBlogPost,
} from '@entities/UserReportBlogPost';
import {REPORT_TYPE} from '@shared/enums/enum';
import {BlogPost} from '@entities/BlogPost';

@Injectable()
@EntityRepository(UserReportBlogPost)
export class UserReportBlogPostRepository extends Repository<UserReportBlogPost> {
  async insertUserReportBlogPost(
    userId: number,
    postId: number,
    reportType: REPORT_TYPE,
  ): Promise<void> {
    await this.createQueryBuilder('userReportBlogPost')
      .insert()
      .into(UserReportBlogPost)
      .values({
        userId,
        postId,
        reportType,
      })
      .execute();
  }

  async selectUserReportBlogPostByUser(
    userId: number,
    postId: number,
  ): Promise<number | undefined> {
    return await this.createQueryBuilder('userReportBlogPost')
      .select('userReportBlogPost.id', 'reportId')
      .where('userReportBlogPost.userId = :userId', {
        userId,
      })
      .andWhere('userReportBlogPost.postId = :postId ', {
        postId,
      })
      .getRawOne<number>();
  }

  async selectUserReportBlogPost(): Promise<IUserReportBlogPost[]> {
    return await this.createQueryBuilder('userReportBlogPost')
      .innerJoin(BlogPost, 'BP', 'BP.id = userReportBlogPost.post_id')
      .getMany();
  }
}
