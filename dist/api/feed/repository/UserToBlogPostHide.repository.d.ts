import { QueryRunner, Repository } from 'typeorm';
import { UserToBlogPostHide } from '@entities/UserToBlogPostHide';
export declare class UserToBlogPostHideRepository extends Repository<UserToBlogPostHide> {
    insertUserToBlogPostHide(userId: number, postId: number, queryRunner?: QueryRunner): Promise<void>;
    selectBlogPostHideByUser(userId: number, queryRunner?: QueryRunner): Promise<UserToBlogPostHide[]>;
}
