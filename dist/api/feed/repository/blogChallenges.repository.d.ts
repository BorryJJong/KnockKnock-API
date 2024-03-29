import { QueryRunner, Repository } from 'typeorm';
import { CreateBlogChallengesDTO, GetBlogChallengesDTO } from '../dto/feed.dto';
import { BlogChallenges } from 'src/entities/BlogChallenges';
import { IBlogChallenge } from 'src/api/feed/interface/blogChallenges.interface';
export declare class BlogChallengesRepository extends Repository<BlogChallenges> {
    createBlogChallenges(createBlogChallengesDTO: CreateBlogChallengesDTO): BlogChallenges;
    saveBlogChallenges(queryRunner: QueryRunner | null, blogChallenges: BlogChallenges): Promise<BlogChallenges>;
    insertBlogChallenges(challenges: IBlogChallenge[], queryRunner?: QueryRunner): Promise<void>;
    getBlogChallengesByChallengeId(challengeId: number): Promise<BlogChallenges[]>;
    getBlogChallengesByPostId(id: number): Promise<GetBlogChallengesDTO[]>;
    deleteBlogChallengesByPostId(queryRunner: QueryRunner | null, postId: number): Promise<import("typeorm").DeleteResult>;
}
