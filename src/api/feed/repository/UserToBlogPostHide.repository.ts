import {Injectable} from '@nestjs/common';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';
import {UserToBlogPostHide} from '@entities/UserToBlogPostHide';

@Injectable()
@EntityRepository(UserToBlogPostHide)
export class UserToBlogPostHideRepository extends Repository<UserToBlogPostHide> {
  async insertUserToBlogPostHide(
    userId: number,
    postId: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.createQueryBuilder('userToBlogPostHide', queryRunner)
      .insert()
      .into(UserToBlogPostHide)
      .values({
        userId,
        postId,
      })
      .execute();
  }

  async selectBlogPostHideByUser(
    userId: number,
    queryRunner?: QueryRunner,
  ): Promise<UserToBlogPostHide[]> {
    return await this.createQueryBuilder('userToBlogPostHide', queryRunner)
      .where('userToBlogPostHide.userId = :userId', {
        userId,
      })
      .getMany();
  }
}
