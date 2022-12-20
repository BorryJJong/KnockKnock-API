import { IBlogPostRepository } from 'src/api/feed/interface/blogPost.interface';
export declare class FeedValidator {
    private blogPostRepository;
    constructor(blogPostRepository: IBlogPostRepository);
    checkFeedAuthor(id: number, userId: number): Promise<void>;
}
