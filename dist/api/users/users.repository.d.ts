import { User } from '@entities/User';
import { SOCIAL_TYPE } from '@shared/enums/enum';
import { ICreateUser, IUpdateUser, IUserRepository } from 'src/api/users/users.interface';
import { QueryRunner, Repository } from 'typeorm';
export declare class UserRepository extends Repository<User> implements IUserRepository {
    insertUser(request: ICreateUser): Promise<User>;
    updateUser(request: IUpdateUser): Promise<void>;
    selectSocialUser(socialUuid: string, socialType: SOCIAL_TYPE): Promise<User | undefined>;
    isExistSocialUser(socialUuid: string, socialType: SOCIAL_TYPE): Promise<number>;
    updateRefreshToken(userId: number, refreshToken: string, queryRunner?: QueryRunner): Promise<void>;
    selectUser(userId: number): Promise<User | undefined>;
    selectUsers(userIds: number[]): Promise<User[]>;
    updateUserDeletedAt(userId: number, queryRunner?: QueryRunner): Promise<void>;
}
