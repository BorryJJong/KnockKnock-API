import { BlogLikeRepository } from 'src/api/like/repository/like.repository';
export declare class LikeValidator {
    private likeRepository;
    constructor(likeRepository: BlogLikeRepository);
    validLike(postId: number, userId: number, isLike: boolean): Promise<void>;
    private getHttpException;
}
