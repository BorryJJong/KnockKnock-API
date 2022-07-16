import { QueryRunner, Repository } from 'typeorm';
import { CreateBlogChallengesDTO } from '../dto/feed.dto';
import { BlogChallenges } from 'src/entities/BlogChallenges';
export declare class BlogChallengesRepository extends Repository<BlogChallenges> {
    createBlogChallenges(createBlogChallengesDTO: CreateBlogChallengesDTO): BlogChallenges;
    saveBlogChallenges(queryRunner: QueryRunner | null, blogChallenges: BlogChallenges): Promise<BlogChallenges>;
    getBlogChallengesByChallengeId(challengeId: number): Promise<BlogChallenges[]>;
}
