import { QueryRunner, Repository } from 'typeorm';
import { CreateBlogImageDTO, GetBlogImageDTO } from '../dto/feed.dto';
import { BlogImage } from 'src/entities/BlogImage';
import { IGetBlogImagesByBlogPost } from '../interface/blogImage.interface';
export declare class BlogImageRepository extends Repository<BlogImage> {
    createBlogImage(createBlogImageDTO: CreateBlogImageDTO): BlogImage;
    saveBlogImage(queryRunner: QueryRunner | null, blogImage: BlogImage): Promise<BlogImage>;
    getBlogImagesByBlogPost(blogPostIds: number[]): Promise<IGetBlogImagesByBlogPost[]>;
    getBlogImageByPostId(id: number): Promise<GetBlogImageDTO[]>;
    deleteBlogImageByPostId(queryRunner: QueryRunner, postId: number): Promise<void>;
}
