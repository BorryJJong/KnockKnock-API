import { QueryRunner } from 'typeorm';
import { BlogPost } from '../../../entities/BlogPost';
import { CreateBlogPostDTO, GetBlogPostDTO } from '../dto/feed.dto';
export interface IBlogPostRepository {
    createBlogPost(createBlogPostDTO: CreateBlogPostDTO): BlogPost;
    saveBlogPost(queryRunner: QueryRunner | null, blogPost: BlogPost): Promise<BlogPost>;
    getBlogPosts(skip: number, take: number, blogPostIds: number[]): Promise<IGetBlogPostItems>;
    getListBlogPost(skip: number, take: number, blogPostIds: number[], excludeBlogPostId: number): Promise<IGetBlogPostItems>;
    getBlogPost(blogPostId: number): Promise<BlogPost>;
    getBlogPostById(id: number): Promise<GetBlogPostDTO>;
}
export interface IGetBlogPostItems {
    items: IGetBlogPostItem[];
    pagination: IPagenationResponse;
}
export declare type IGetBlogPostItem = BlogPost;
export interface IPagenationResponse {
    skip: number;
    take: number;
    total: number;
}
