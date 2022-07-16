import { QueryRunner, Repository } from 'typeorm';
import { CreateBlogPostDTO } from '../dto/feed.dto';
import { BlogPost } from 'src/entities/BlogPost';
import { IGetBlogPostItems } from '../interface/blogPost.interface';
export declare class BlogPostRepository extends Repository<BlogPost> {
    createBlogPost(createBlogPostDTO: CreateBlogPostDTO): BlogPost;
    saveBlogPost(queryRunner: QueryRunner | null, blogPost: BlogPost): Promise<BlogPost>;
    getBlogPosts(skip: number, take: number, blogPostIds: number[]): Promise<IGetBlogPostItems>;
}
