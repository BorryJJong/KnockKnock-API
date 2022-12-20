import { QueryRunner } from 'typeorm';
import { BlogPost } from '../../../entities/BlogPost';
import { CreateBlogPostDTO, GetBlogPostDTO, UpdateBlogPostDTO } from '../dto/feed.dto';
export interface IBlogPostRepository {
    createBlogPost(createBlogPostDTO: CreateBlogPostDTO | UpdateBlogPostDTO): BlogPost;
    updateBlogPost(queryRunner: QueryRunner | null, postId: number, updateBlogPostDTO: UpdateBlogPostDTO): any;
    saveBlogPost(queryRunner: QueryRunner | null, blogPost: BlogPost): Promise<BlogPost>;
    getBlogPosts(page: number, take: number, blogPostIds: number[]): Promise<IGetBlogPostItems>;
    getListBlogPost(page: number, take: number, blogPostIds: number[], excludeBlogPostId: number, userId: number): Promise<IGetBlogPostItems>;
    getBlogPost(blogPostId: number): Promise<BlogPost>;
    getBlogPostById(id: number): Promise<GetBlogPostDTO>;
    updateBlogPostHits(id: number): Promise<void>;
    deleteBlogPost(id: number, queryRunner?: QueryRunner): Promise<void>;
    selectBlogPostByUser(id: number, userId: number): Promise<BlogPost | undefined>;
}
export interface IGetBlogPostItems {
    items: IGetBlogPostItem[];
    pagination: IPagenationResponse;
}
export declare type IGetBlogPostItem = BlogPost;
export interface IPagenationResponse {
    page: number;
    take: number;
    total: number;
}
