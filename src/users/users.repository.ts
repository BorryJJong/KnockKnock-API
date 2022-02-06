import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserRequestDTO } from './dto/users.dto';
import { User } from './users.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async checkExistEmail({ email }) {
    const user = await this.findOne({ select: ['email'], where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');
    }
  }

  public async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<User> {
    const user = this.create({ ...createUserRequestDTO });
    return await this.save(user);
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
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
    delete user.password;
    return user;
  }
}
