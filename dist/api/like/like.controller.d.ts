import { GetListFeedLikeResDTO } from '../feed/dto/feed.dto';
import { LikeService } from './like.service';
import { IUser } from 'src/api/users/users.interface';
import { ApiResponseDTO, ErrorDTO } from '@shared/dto/response.dto';
import { LikeValidator } from 'src/api/like/like.validator';
export declare class LikeController {
    private readonly likeService;
    private readonly likeValidator;
    constructor(likeService: LikeService, likeValidator: LikeValidator);
    feedLike(id: number, user: IUser): Promise<ApiResponseDTO<void | ErrorDTO>>;
    feedUnLike(id: number, user: IUser): Promise<ApiResponseDTO<void | ErrorDTO>>;
    getListFeedLike(user: IUser, id: number): Promise<ApiResponseDTO<GetListFeedLikeResDTO | ErrorDTO>>;
}
