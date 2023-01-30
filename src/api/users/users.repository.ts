import {User} from '@entities/User';
import {Injectable} from '@nestjs/common';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {ICreateUser, IUserRepository} from 'src/api/users/users.interface';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';

@Injectable()
@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  public async insertUser(
    request: ICreateUser,
    fileUrl: string,
  ): Promise<User> {
    return await this.save(
      this.create({
        ...request,
        image: fileUrl,
      }),
    );
  }

  public async updateUser(
    userId: number,
    nickname?: string,
    fileUrl?: string,
  ): Promise<void> {
    await this.createQueryBuilder()
      .update(User)
      .set({
        ...(nickname && {nickname}),
        ...(fileUrl && {image: fileUrl}),
      })
      .where('id = :id', {id: userId})
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
    refreshToken?: string,
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

  public async selectUserFindOneOrFail(userId: number): Promise<User> {
    return await this.findOneOrFail(userId);
  }

  public async selectUsers(userIds: number[]): Promise<User[]> {
    return await this.findByIds(userIds, {
      withDeleted: true,
    });
  }

  public async updateUserDeletedAt(
    userId: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.createQueryBuilder('users', queryRunner)
      .where('users.id = :id', {
        id: userId,
      })
      .softDelete();
  }

  public async deleteUserInfo(
    userId: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.createQueryBuilder('users', queryRunner)
      .update()
      .set({
        nickname: '',
        socialUuid: '',
        socialType: SOCIAL_TYPE.NONE,
      })
      .where('id = :id', {id: userId})
      .execute();
  }

  public async selectUserNickname(
    nickname: string,
  ): Promise<string | undefined> {
    return await this.findOne({
      where: {
        nickname,
      },
    }).then(user => user?.nickname);
  }
}
