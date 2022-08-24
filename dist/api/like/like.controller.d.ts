import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    feedLike(id: number, userId: number): Promise<boolean>;
    feedUnLike(id: number, userId: number): Promise<boolean>;
}
