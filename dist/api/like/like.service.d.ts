import { UsersService } from 'src/api/users/users.service';
import { GetListFeedLikeResDTO } from '../feed/dto/feed.dto';
import { BlogLikeRepository } from './repository/like.repository';
export declare class LikeService {
    private blogLikeRepository;
    private userService;
    constructor(blogLikeRepository: BlogLikeRepository, userService: UsersService);
    feedLike(id: number, userId: number): Promise<void>;
    feedUnLike(id: number, userId: number): Promise<boolean>;
    getListFeedLike(id: number, userId?: number): Promise<GetListFeedLikeResDTO>;
}
