import {User} from '@entities/User';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SocialLoginRequestDTO} from 'src/auth/dto/auth.dto';
import {GetUserRequestDTO, GetUserResponseDTO} from './dto/users.dto';
import {ICreateUser, IUpdateUser, UserRepository} from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async saveUser(request: ICreateUser): Promise<void> {
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

  async getUserV2({id}: GetUserRequestDTO): Promise<GetUserResponseDTO> {
    const user = await this.userRepository.findUserById(id);
    const {email} = user;
    return {
      id,
      email,
      nickName: 'asdf',
      createdAt: new Date(),
    };
  }
}
