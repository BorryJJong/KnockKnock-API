import {UserToBlockUser} from '@entities/UserToBlockUser';
import {QueryRunner} from 'typeorm';

export interface IUserToBlockUserRepository {
  insertUserToBlockUser(
    userId: number,
    blockUserId: number,
    queryRunner?: QueryRunner,
  ): Promise<void>;

  selectBlockUser(
    userId: number,
    blockUserId: number,
    queryRunner?: QueryRunner,
  ): Promise<UserToBlockUser | undefined>;

  selectBlockUserByUser(
    userIds: number[],
    queryRunner?: QueryRunner,
  ): Promise<UserToBlockUser[]>;

  deleteUserToBlockUser(
    userId: number,
    blockUserId: number,
    queryRunner?: QueryRunner,
  ): Promise<void>;
}
