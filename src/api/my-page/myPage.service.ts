import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from 'src/api/users/users.repository';

@Injectable()
export class MyPageService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async isLogin(userId: number): Promise<boolean> {
    const user = await this.userRepository.selectUser(userId);

    // 로그아웃 여부
    return user.refreshToken ? true : false;
  }
}
