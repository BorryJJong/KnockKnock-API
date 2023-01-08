import { UsersService } from 'src/api/users/users.service';
import { GetListFeedLikeResDTO } from '../feed/dto/feed.dto';
import { LikeService } from './like.service';
import { IUser } from 'src/api/users/users.interface';
import { ApiResponseDTO } from '@shared/dto/response.dto';
export declare class LikeController {
    private readonly likeService;
    private readonly userService;
    constructor(likeService: LikeService, userService: UsersService);
    feedLike(id: number, user: IUser): Promise<ApiResponseDTO<void>>;
    feedUnLike(id: number, user: IUser): Promise<ApiResponseDTO<void>>;
    getListFeedLike(id: number): Promise<ApiResponseDTO<GetListFeedLikeResDTO>>;
}
