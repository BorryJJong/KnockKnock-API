import {Injectable} from '@nestjs/common';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';
import {UserToBlockUser} from '@entities/UserToBlockUser';
import {IUserToBlockUserRepository} from 'src/api/users/interface/userToBlockUser.interface';

@Injectable()
@EntityRepository(UserToBlockUser)
export class UserToBlockUserRepository
  extends Repository<UserToBlockUser>
  implements IUserToBlockUserRepository
{
  async insertUserToBlockUser(
    userId: number,
    blockUserId: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.createQueryBuilder('userToBlockUser', queryRunner)
      .insert()
      .into(UserToBlockUser)
      .values({
        userId,
        blockUserId,
      })
      .execute();
  }

  async selectBlockUser(
    userId: number,
    blockUserId: number,
    queryRunner?: QueryRunner,
  ): Promise<UserToBlockUser | undefined> {
    return await this.createQueryBuilder('userToBlockUser', queryRunner)
      .where('userToBlockUser.userId = :userId', {
        userId,
      })
      .andWhere('userToBlockUser.blockUserId = :blockUserId', {
        blockUserId,
      })
      .getOne();
  }

  async selectBlockUserByUser(
    userIds: number[],
    queryRunner?: QueryRunner,
  ): Promise<UserToBlockUser[]> {
    if (userIds.length === 0) {
      return [];
    }

    return await this.createQueryBuilder('userToBlockUser', queryRunner)
      .where('userToBlockUser.userId IN (:...userIds)', {
        userIds,
      })
      .getMany();
  }

  async deleteUserToBlockUser(
    userId: number,
    blockUserId: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.createQueryBuilder('userToBlockUser', queryRunner)
      .delete()
      .where('userId = :userId', {
        userId,
      })
      .andWhere('blockUserId = :blockUserId', {
        blockUserId,
      })
      .execute();
  }
}
