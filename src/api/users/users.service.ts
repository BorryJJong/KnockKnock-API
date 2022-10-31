import {User} from '@entities/User';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ICreateUser, IUpdateUser} from 'src/api/users/users.interface';
import {SocialLoginRequestDTO} from 'src/auth/dto/auth.dto';
import {UserRepository} from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async saveUser(request: ICreateUser): Promise<User> {
    return await this.userRepository.insertUser(request);
  }

  async updateUser(request: IUpdateUser): Promise<void> {
    return await this.userRepository.updateUser(request);
  }

  async getSocialUser({
    socialUuid,
    socialType,
  }: SocialLoginRequestDTO): Promise<User | undefined> {
    return await this.userRepository.selectSocialUser(socialUuid, socialType);
  }
}
