import {Injectable} from '@nestjs/common';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';
import {CreateBlogChallengesDTO} from './dto/feed.dto';
import {BlogChallenges} from 'src/entities/BlogChallenges';

@Injectable()
@EntityRepository(BlogChallenges)
export class BlogChallengesRepository extends Repository<BlogChallenges> {
  createBlogChallenges(
    createBlogChallengesDTO: CreateBlogChallengesDTO,
  ): BlogChallenges {
    return this.create({...createBlogChallengesDTO});
  }

  async saveBlogChallenges(
    queryRunner: QueryRunner | null,
    blogChallenges: BlogChallenges,
  ): Promise<BlogChallenges> {
    if (queryRunner === null) {
      return await this.save(blogChallenges);
    } else {
      return await queryRunner.manager.save(blogChallenges);
    }
  }

  async getBlogChallengesByChallengeId(
    challengeId: number,
  ): Promise<BlogChallenges[]> {
    return this.createQueryBuilder('blogChallenges')
      .where('blogChallenges.challengeId = :challengeId ', {challengeId})
      .getMany();
  }
}
