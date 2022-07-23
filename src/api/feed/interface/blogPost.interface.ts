import {QueryRunner} from 'typeorm';
import {BlogPost} from '../../../entities/BlogPost';
import {CreateBlogPostDTO} from '../dto/feed.dto';

export interface IBlogPostRepository {
  createBlogPost(createBlogPostDTO: CreateBlogPostDTO): BlogPost;
  saveBlogPost(
    queryRunner: QueryRunner | null,
    blogPost: BlogPost,
  ): Promise<BlogPost>;
  getBlogPosts(
    skip: number,
    take: number,
    blogPostIds: number[],
  ): Promise<IGetBlogPostItems>;
  getListBlogPost(
    skip: number,
    take: number,
    blogPostIds: number[],
    excludeBlogPostId: number,
  ): Promise<IGetBlogPostItems>;
  getBlogPost(blogPostId: number): Promise<BlogPost>;
}
export interface IGetBlogPostItems {
  items: IGetBlogPostItem[];
  pagination: IPagenationResponse;
}

export type IGetBlogPostItem = BlogPost;

export interface IPagenationResponse {
  skip: number;
  take: number;
  total: number;
}
