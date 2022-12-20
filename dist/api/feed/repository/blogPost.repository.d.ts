import { BlogPost } from '../../../entities/BlogPost';
import { IBlogPostRepository, IGetBlogPostItems } from '../interface/blogPost.interface';
import { QueryRunner, Repository } from 'typeorm';
import { CreateBlogPostDTO, GetBlogPostDTO, UpdateBlogPostDTO } from '../dto/feed.dto';
export declare class BlogPostRepository extends Repository<BlogPost> implements IBlogPostRepository {
    createBlogPost(createBlogPostDTO: CreateBlogPostDTO | UpdateBlogPostDTO): BlogPost;
    saveBlogPost(queryRunner: QueryRunner | null, blogPost: BlogPost): Promise<BlogPost>;
    updateBlogPost(queryRunner: QueryRunner | null, postId: number, blogPost: BlogPost): Promise<import("typeorm").UpdateResult>;
    getBlogPosts(page: number, take: number, blogPostIds: number[]): Promise<IGetBlogPostItems>;
    getListBlogPost(page: number, take: number, blogPostIds: number[], excludeBlogPostId?: number): Promise<IGetBlogPostItems>;
    getBlogPost(blogPostId: number): Promise<BlogPost>;
    getBlogPostById(id: number): Promise<GetBlogPostDTO>;
    updateBlogPostHits(id: number): Promise<void>;
    deleteBlogPost(id: number, queryRunner?: QueryRunner): Promise<void>;
    selectBlogPostByUser(id: number, userId: number): Promise<BlogPost | undefined>;
}
