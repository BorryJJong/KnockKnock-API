import {User} from '@entities/User';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {QueryRunner} from 'typeorm';

export interface IUserRepository {
  insertUser(request: ICreateUser): Promise<User>;
  updateUser(userId: number, nickname?: string): Promise<void>;
  selectSocialUser(
    socialUuid: string,
    socialType: SOCIAL_TYPE,
  ): Promise<User | undefined>;
  isExistSocialUser(
    socialUuid: string,
    socialType: SOCIAL_TYPE,
  ): Promise<number>;
  updateRefreshToken(
    userId: number,
    refreshToken: string,
    queryRunner?: QueryRunner,
  ): Promise<void>;
  selectUser(userId: number): Promise<User | undefined>;
  selectUserFindOneOrFail(userId: number): Promise<User>;
  updateUserDeletedAt(userId: number, queryRunner?: QueryRunner);
  deleteUserInfo(userId: number, queryRunner?: QueryRunner): Promise<void>;
  selectUserNickname(nickname: string): Promise<string | undefined>;
}

export interface ICreateUser {
  socialType: SOCIAL_TYPE;
  socialUuid: string;
  nickname: string;
}
export interface IUpdateUser {
  id: number;
  nickname: string;
  image: string;
}

export interface IUser {
  id: number;
  nickname: string;
  socialUuid: string;
  socialType: SOCIAL_TYPE;
  image: string;
  serviceConnectionDate?: Date;
  regDate: Date;
  refreshToken?: string;
  deletedAt: Date | null;
}
