import { GetFeedLikeDTO } from 'src/api/feed/dto/feed.dto';
import { Repository } from 'typeorm';
import { BlogLike } from '../../../entities/BlogLike';
export declare class BlogLikeRepository extends Repository<BlogLike> {
    insertFeedLike(id: number, userId: number): Promise<boolean>;
    deleteFeedLike(id: number, userId: number): Promise<boolean>;
    getListFeedLike(postId: number): Promise<GetFeedLikeDTO[]>;
}
