import {User} from '@entities/User';
import {SOCIAL_TYPE} from '@shared/enums/enum';

export interface IUserRepository {
  insertUser(request: ICreateUser): Promise<User>;
  updateUser(request: IUpdateUser): Promise<void>;
  selectSocialUser(
    socialUuid: string,
    socialType: SOCIAL_TYPE,
  ): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User>;
  findUserByIdWithoutPassword(id: string): Promise<User>;
  isExistSocialUser(
    socialUuid: string,
    socialType: SOCIAL_TYPE,
  ): Promise<number>;
  selectUser(userId: number): Promise<User | undefined>;
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
