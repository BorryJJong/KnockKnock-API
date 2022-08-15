import {QueryRunner} from 'typeorm';
import {BlogPost} from '../../../entities/BlogPost';
import {CreateBlogPostDTO, GetBlogPostDTO} from '../dto/feed.dto';

export interface IBlogPostRepository {
  createBlogPost(createBlogPostDTO: CreateBlogPostDTO): BlogPost;
  saveBlogPost(
    queryRunner: QueryRunner | null,
    blogPost: BlogPost,
  ): Promise<BlogPost>;
  getBlogPosts(
    page: number,
    take: number,
    blogPostIds: number[],
  ): Promise<IGetBlogPostItems>;
  getListBlogPost(
    page: number,
    take: number,
    blogPostIds: number[],
    excludeBlogPostId: number,
  ): Promise<IGetBlogPostItems>;
  getBlogPost(blogPostId: number): Promise<BlogPost>;
  getBlogPostById(id: number): Promise<GetBlogPostDTO>;
}

export interface IGetBlogPostItems {
  items: IGetBlogPostItem[];
  pagination: IPagenationResponse;
}

export type IGetBlogPostItem = BlogPost;

export interface IPagenationResponse {
  page: number;
  take: number;
  total: number;
}
