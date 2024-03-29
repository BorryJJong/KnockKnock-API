import {QueryRunner} from 'typeorm';
import {BlogPost} from '../../../entities/BlogPost';
import {
  CreateBlogPostDTO,
  GetBlogPostDTO,
  UpdateBlogPostDTO,
} from '../dto/feed.dto';

export interface IBlogPostRepository {
  createBlogPost(
    createBlogPostDTO: CreateBlogPostDTO | UpdateBlogPostDTO,
    userId?: number,
  ): BlogPost;
  updateBlogPost(
    queryRunner: QueryRunner | null,
    postId: number,
    updateBlogPostDTO: UpdateBlogPostDTO,
  );
  saveBlogPost(
    queryRunner: QueryRunner | null,
    blogPost: BlogPost,
  ): Promise<BlogPost>;
  getBlogPosts(
    page: number,
    take: number,
    blogPostIds: number[],
    excludeBlogPostIds: number[],
    excludeUserIds: number[],
  ): Promise<IGetBlogPostItems>;
  getListBlogPost(
    page: number,
    take: number,
    blogPostIds: number[],
    excludeBlogPostId: number[],
    excludeUserIds: number[],
  ): Promise<IGetBlogPostItems>;
  getBlogPost(blogPostId: number): Promise<BlogPost>;
  getBlogPostById(
    id: number,
    userId?: number,
  ): Promise<GetBlogPostDTO | undefined>;
  updateBlogPostHits(id: number): Promise<void>;
  deleteBlogPost(id: number, queryRunner?: QueryRunner): Promise<void>;
  selectBlogPostByUser(
    id: number,
    userId: number,
  ): Promise<BlogPost | undefined>;
  updateBlogPostHideCount(id: number, queryRunner?: QueryRunner): Promise<void>;
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

export interface IGetHotFeedsResponse {
  id: number;
  scale: string;
  nickname: string;
}
