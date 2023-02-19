import { QueryRunner, Repository } from 'typeorm';
import { BlogComment, IBlogComment } from 'src/entities/BlogComment';
import { GetBlogCommentDTO, GetListFeedCommentResDTO, InsBlogCommentDTO } from '../dto/feed.dto';
import { IGetFeedsByCommentCountResponse } from 'src/api/feed/interface/blogComment.interface';
export declare class BlogCommentRepository extends Repository<BlogComment> {
    createBlogComment(insBlogCommentDTO: InsBlogCommentDTO, userId: number): BlogComment;
    saveBlogComment(queryRunner: QueryRunner | null, BlogComment: BlogComment): Promise<BlogComment>;
    getBlogCommentByPostId(id: number): Promise<GetListFeedCommentResDTO[]>;
    getBlogCommentByCommentId(id: number): Promise<GetBlogCommentDTO[]>;
    getBlogComment(id: number): Promise<IBlogComment>;
    getReplyBlogComments(id: number): Promise<IBlogComment[]>;
    selectFeedsByCommentCount(postIds: number[]): Promise<IGetFeedsByCommentCountResponse[]>;
    selectBlogPostCommentByUser(id: number, userId: number): Promise<BlogComment | undefined>;
    deleteBlogComment(ids: number[]): Promise<void>;
}
