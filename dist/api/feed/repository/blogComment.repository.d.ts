import { QueryRunner, Repository } from 'typeorm';
import { BlogComment } from 'src/entities/BlogComment';
import { GetBlogCommentDTO, GetListFeedCommentResDTO, InsBlogCommentDTO } from '../dto/feed.dto';
import { IGetFeedsByCommentCountResponse } from 'src/api/feed/interface/blogComment.interface';
export declare class BlogCommentRepository extends Repository<BlogComment> {
    createBlogComment(insBlogCommentDTO: InsBlogCommentDTO): BlogComment;
    saveBlogComment(queryRunner: QueryRunner | null, BlogComment: BlogComment): Promise<BlogComment>;
    getBlogCommentByPostId(id: number): Promise<GetListFeedCommentResDTO[]>;
    getBlogCommentByCommentId(id: number): Promise<GetBlogCommentDTO[]>;
    getBlogComment(id: number): Promise<BlogComment>;
    selectFeedsByCommentCount(postIds: number[]): Promise<IGetFeedsByCommentCountResponse[]>;
}
