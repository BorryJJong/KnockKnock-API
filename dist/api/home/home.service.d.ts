import { BlogPostRepository } from 'src/api/feed/repository/blogPost.repository';
import { GetListHotFeedResDTO } from 'src/api/home/dto/home.dto';
export declare class HomeService {
    private readonly blogPostRepository;
    constructor(blogPostRepository: BlogPostRepository);
    getListHotFeed(challengeId: number): Promise<GetListHotFeedResDTO[]>;
}
