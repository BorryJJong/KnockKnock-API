import { BlogPost } from '../../../entities/BlogPost';
import { IBlogPostRepository, IGetBlogPostItems } from '../interface/blogPost.interface';
import { QueryRunner, Repository } from 'typeorm';
import { CreateBlogPostDTO, GetBlogPostDTO } from '../dto/feed.dto';
export declare class BlogPostRepository extends Repository<BlogPost> implements IBlogPostRepository {
    createBlogPost(createBlogPostDTO: CreateBlogPostDTO): BlogPost;
    saveBlogPost(queryRunner: QueryRunner | null, blogPost: BlogPost): Promise<BlogPost>;
    getBlogPosts(skip: number, take: number, blogPostIds: number[]): Promise<IGetBlogPostItems>;
    getListBlogPost(skip: number, take: number, blogPostIds: number[], excludeBlogPostId: number): Promise<IGetBlogPostItems>;
    getBlogPost(blogPostId: number): Promise<BlogPost>;
    getBlogPostById(id: number): Promise<GetBlogPostDTO>;
}
