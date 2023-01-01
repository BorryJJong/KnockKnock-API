import { IBlogPostRepository } from 'src/api/feed/interface/blogPost.interface';
import { BlogCommentRepository } from 'src/api/feed/repository/blogComment.repository';
import { IUserRepository } from 'src/api/users/users.interface';
export declare class FeedValidator {
    private blogPostRepository;
    private blogCommentRepository;
    private userRepository;
    constructor(blogPostRepository: IBlogPostRepository, blogCommentRepository: BlogCommentRepository, userRepository: IUserRepository);
    checkFeedAuthor(id: number, userId: number): Promise<void>;
    checkFeedCommentAuthor(id: number, userId: number): Promise<void>;
    checkPermissionCreateFeed(userId: number): Promise<void>;
    checkPermissionUpdateFeed(id: number, userId: number): Promise<void>;
}
