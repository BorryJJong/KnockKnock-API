import {User} from '@entities/User';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ICreateUser, IUpdateUser} from 'src/api/users/users.interface';
import {SocialLoginRequestDTO} from 'src/auth/dto/auth.dto';
import {KakaoService} from 'src/auth/kakao.service';
import {Connection, QueryRunner} from 'typeorm';
import {UserRepository} from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly kakaoService: KakaoService,
    private connection: Connection,
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

  async getUser(userId: number): Promise<User | undefined> {
    return await this.userRepository.selectUser(userId);
  }

  async logout(userId: number): Promise<void> {
    await this.userRepository.updateRefreshToken(userId, null);
  }

  async deleteUser(
    userId: number,
    socialUuid: string,
    isKakao: boolean,
  ): Promise<void> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (isKakao) {
        await this.kakaoService.unlink(socialUuid);
      }

      await this.userRepository.updateUserDeletedAt(userId, queryRunner);
      await this.userRepository.updateRefreshToken(userId, null, queryRunner);
      await this.userRepository.deleteUserInfo(userId, queryRunner);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }
}
