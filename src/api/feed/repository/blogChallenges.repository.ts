import {Injectable} from '@nestjs/common';
import {EntityRepository, getManager, QueryRunner, Repository} from 'typeorm';
import {CreateBlogChallengesDTO, GetBlogChallengesDTO} from '../dto/feed.dto';
import {BlogChallenges} from 'src/entities/BlogChallenges';
import {Challenges} from 'src/entities/Challenges';
import {IBlogChallenge} from 'src/api/feed/interface/blogChallenges.interface';

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

  async insertBlogChallenges(
    challenges: IBlogChallenge[],
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.createQueryBuilder('blogChallenges', queryRunner)
      .insert()
      .into(BlogChallenges)
      .values(challenges)
      .execute();
  }

  async getBlogChallengesByChallengeId(
    challengeId: number,
  ): Promise<BlogChallenges[]> {
    return this.createQueryBuilder('blogChallenges')
      .where('blogChallenges.challengeId = :challengeId', {challengeId})
      .getMany();
  }

  async getBlogChallengesByPostId(id: number) {
    const challenges: GetBlogChallengesDTO[] = await getManager()
      .createQueryBuilder()
      .select('bc.id', 'id')
      .addSelect('bc.challenge_id', 'challengeId')
      .addSelect('c.title', 'title')
      .from(BlogChallenges, 'bc')
      .innerJoin(Challenges, 'c', 'bc.challenge_id = c.id')
      .where('bc.post_id = :id', {id: id})
      .getRawMany();

    return challenges;
  }

  async deleteBlogChallengesByPostId(
    queryRunner: QueryRunner | null,
    postId: number,
  ) {
    if (queryRunner === null) {
      return await this.delete({postId: postId});
    } else {
      return await queryRunner.manager.delete(BlogChallenges, {postId: postId});
    }
  }
}
