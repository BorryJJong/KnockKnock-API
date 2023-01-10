import { GetFeedLikeDTO } from 'src/api/feed/dto/feed.dto';
import { IGetFeedsByLikeCountResponse } from 'src/api/like/like.interface';
import { Repository } from 'typeorm';
import { BlogLike } from '../../../entities/BlogLike';
export declare class BlogLikeRepository extends Repository<BlogLike> {
    insertFeedLike(id: number, userId: number): Promise<boolean>;
    deleteFeedLike(id: number, userId: number): Promise<boolean>;
    getListFeedLike(postId: number): Promise<GetFeedLikeDTO[]>;
    selectFeedListByUserLikes(postIds: number[], userId: number): Promise<BlogLike[]>;
    selectFeedsByLikeCount(postIds: number[]): Promise<IGetFeedsByLikeCountResponse[]>;
    selectFeedByUser(postId: number, userId: number): Promise<number>;
}
