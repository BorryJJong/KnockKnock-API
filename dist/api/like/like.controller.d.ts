import { UsersService } from 'src/api/users/users.service';
import { GetListFeedLikeResponse } from '@shared/response_entities/feed/temp.response';
import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likeService;
    private readonly userService;
    constructor(likeService: LikeService, userService: UsersService);
    feedLike(id: number, req: any): Promise<boolean>;
    feedUnLike(id: number, req: any): Promise<boolean>;
    getListFeedLike(id: number): Promise<GetListFeedLikeResponse>;
}
