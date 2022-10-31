import {User} from '@entities/User';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {
  ICreateUser,
  IUpdateUser,
  IUserRepository,
} from 'src/api/users/users.interface';
import {EntityRepository, Repository} from 'typeorm';

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

  public async findUserByEmail(email: string): Promise<User> {
    return await this.findOne({email});
  }

  public async findUserById(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 유저입니다.');
    }
    return user;
  }

  public async findUserByIdWithoutPassword(id: string): Promise<User> {
    const user = await this.findOne(id);
    return user;
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
}
