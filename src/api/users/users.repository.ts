import {User} from '@entities/User';
import {Injectable} from '@nestjs/common';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {
  ICreateUser,
  IUpdateUser,
  IUserRepository,
} from 'src/api/users/users.interface';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';

@Injectable()
@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  public async insertUser(request: ICreateUser): Promise<User> {
    return await this.save(
      this.create({
        ...request,
      }),
    );
  }

  public async updateUser(request: IUpdateUser): Promise<void> {
    await this.createQueryBuilder()
      .update(User)
      .set({
        nickname: request.nickname,
      })
      .where('id = :id', {id: request.id})
      .execute();
  }

  public async selectSocialUser(
    socialUuid: string,
    socialType: SOCIAL_TYPE,
  ): Promise<User | undefined> {
    return await this.createQueryBuilder('users')
      .where('users.socialUuid = :socialUuid', {socialUuid})
      .andWhere('users.socialType = :socialType', {socialType})
      .getOne();
  }

  public async isExistSocialUser(
    socialUuid: string,
    socialType: SOCIAL_TYPE,
  ): Promise<number> {
    return await this.createQueryBuilder('users')
      .where('users.socialUuid = :socialUuid', {socialUuid})
      .andWhere('users.socialType = :socialType', {socialType})
      .getCount();
  }

  public async updateRefreshToken(
    userId: number,
    refreshToken: string,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.createQueryBuilder('users', queryRunner)
      .update()
      .set({refreshToken})
      .where('id = :id', {id: userId})
      .execute();
  }

  public async selectUser(userId: number): Promise<User | undefined> {
    return await this.findOne(userId);
  }

  public async selectUsers(userIds: number[]): Promise<User[]> {
    return await this.findByIds(userIds);
  }

  public async updateUserDeletedAt(
    userId: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await queryRunner.manager.softDelete(User, userId);
  }
}
