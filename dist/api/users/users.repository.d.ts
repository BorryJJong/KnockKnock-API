import { User } from '@entities/User';
import { SOCIAL_TYPE } from '@shared/enums/enum';
import { ICreateUser, IUserRepository } from 'src/api/users/users.interface';
import { QueryRunner, Repository } from 'typeorm';
export declare class UserRepository extends Repository<User> implements IUserRepository {
    insertUser(request: ICreateUser, fileUrl: string): Promise<User>;
    updateUser(userId: number, nickname?: string, fileUrl?: string): Promise<void>;
    selectSocialUser(socialUuid: string, socialType: SOCIAL_TYPE): Promise<User | undefined>;
    isExistSocialUser(socialUuid: string, socialType: SOCIAL_TYPE): Promise<number>;
    updateRefreshToken(userId: number, refreshToken?: string, queryRunner?: QueryRunner): Promise<void>;
    selectUser(userId: number): Promise<User | undefined>;
    selectUserFindOneOrFail(userId: number): Promise<User>;
    selectUsers(userIds: number[]): Promise<User[]>;
    updateUserDeletedAt(userId: number, queryRunner?: QueryRunner): Promise<void>;
    deleteUserInfo(userId: number, queryRunner?: QueryRunner): Promise<void>;
    selectUserNickname(nickname: string): Promise<string | undefined>;
}
