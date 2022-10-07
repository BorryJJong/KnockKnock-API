import { BlogLikeRepository } from './repository/feed.repository';
export declare class LikeService {
    private blogLikeRepository;
    constructor(blogLikeRepository: BlogLikeRepository);
    feedLike(id: number, userId: number): Promise<boolean>;
    feedUnLike(id: number, userId: number): Promise<boolean>;
}
