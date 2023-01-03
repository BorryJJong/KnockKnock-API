import { UsersService } from 'src/api/users/users.service';
import { GetListFeedLikeResponse } from '@shared/response_entities/feed/temp.response';
import { LikeService } from './like.service';
import { IUser } from 'src/api/users/users.interface';
export declare class LikeController {
    private readonly likeService;
    private readonly userService;
    constructor(likeService: LikeService, userService: UsersService);
    feedLike(id: number, user: IUser): Promise<boolean>;
    feedUnLike(id: number, user: IUser): Promise<boolean>;
    getListFeedLike(id: number): Promise<GetListFeedLikeResponse>;
}
