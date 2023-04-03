import { QueryRunner, Repository } from 'typeorm';
import { UserToBlockUser } from '@entities/UserToBlockUser';
import { IUserToBlockUserRepository } from 'src/api/users/interface/userToBlockUser.interface';
export declare class UserToBlockUserRepository extends Repository<UserToBlockUser> implements IUserToBlockUserRepository {
    insertUserToBlockUser(userId: number, blockUserId: number, queryRunner?: QueryRunner): Promise<void>;
    selectBlockUser(userId: number, blockUserId: number, queryRunner?: QueryRunner): Promise<UserToBlockUser | undefined>;
    selectBlockUserByUser(userIds: number[], queryRunner?: QueryRunner): Promise<UserToBlockUser[]>;
    deleteUserToBlockUser(userId: number, blockUserId: number, queryRunner?: QueryRunner): Promise<void>;
}
