import { GetListFeedLikeResDTO } from '../feed/dto/feed.dto';
import { BlogLikeRepository } from './repository/like.repository';
export declare class LikeService {
    private blogLikeRepository;
    constructor(blogLikeRepository: BlogLikeRepository);
    feedLike(id: number, userId: number): Promise<void>;
    feedUnLike(id: number, userId: number): Promise<boolean>;
    getListFeedLike(id: number): Promise<GetListFeedLikeResDTO>;
}
