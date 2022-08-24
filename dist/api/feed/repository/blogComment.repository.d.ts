import { QueryRunner, Repository } from 'typeorm';
import { BlogComment } from 'src/entities/BlogComment';
import { InsBlogCommentDTO } from '../dto/feed.dto';
export declare class BlogCommentRepository extends Repository<BlogComment> {
    createBlogComment(insBlogCommentDTO: InsBlogCommentDTO): BlogComment;
    saveBlogComment(queryRunner: QueryRunner | null, BlogComment: BlogComment): Promise<BlogComment>;
}
