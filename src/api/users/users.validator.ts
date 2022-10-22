import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {IUserRepository} from 'src/api/users/users.interface';
import {UserRepository} from 'src/api/users/users.repository';

@Injectable()
export class UserValidator {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async checkExistSocialUser(
    socialUuid: string,
    socialType: SOCIAL_TYPE,
  ) {
    const user = await this.userRepository.isExistSocialUser(
      socialUuid,
      socialType,
    );

    if (user) {
      throw new Error('이미 회원이 존재합니다');
    }
  }
}
