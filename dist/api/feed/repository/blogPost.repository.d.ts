import { BlogPost } from '../../../entities/BlogPost';
import { IBlogPostRepository, IGetBlogPostItems } from '../interface/blogPost.interface';
import { QueryRunner, Repository } from 'typeorm';
import { CreateBlogPostDTO, GetBlogPostDTO, UpdateBlogPostDTO } from '../dto/feed.dto';
import { GetListHotFeedResDTO } from 'src/api/home/dto/home.dto';
export interface test {
    postId: number;
    scale: string;
    nickname: string;
    fileUrl: string;
}
export declare class BlogPostRepository extends Repository<BlogPost> implements IBlogPostRepository {
    createBlogPost(createBlogPostDTO: CreateBlogPostDTO | UpdateBlogPostDTO, userId?: number): BlogPost;
    saveBlogPost(queryRunner: QueryRunner | null, blogPost: BlogPost): Promise<BlogPost>;
    updateBlogPost(queryRunner: QueryRunner | null, postId: number, blogPost: BlogPost): Promise<import("typeorm").UpdateResult>;
    getBlogPosts(page: number, take: number, blogPostIds: number[], excludeBlogPostIds: number[], excludeUserIds: number[]): Promise<IGetBlogPostItems>;
    getListBlogPost(page: number, take: number, blogPostIds: number[], excludeBlogPostId: number[], excludeUserIds: number[]): Promise<IGetBlogPostItems>;
    getBlogPost(blogPostId: number): Promise<BlogPost>;
    getBlogPostById(id: number, userId?: number): Promise<GetBlogPostDTO | undefined>;
    updateBlogPostHits(id: number): Promise<void>;
    deleteBlogPost(id: number, queryRunner?: QueryRunner): Promise<void>;
    selectBlogPostByUser(id: number, userId: number): Promise<BlogPost | undefined>;
    selectBlogPostByHotFeeds(challengeId: number, excludeUserIds: number[], excludePostIds: number[]): Promise<GetListHotFeedResDTO[]>;
    updateBlogPostHideCount(id: number, queryRunner?: QueryRunner): Promise<void>;
}
