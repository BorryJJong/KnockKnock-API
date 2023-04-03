import {User} from '@entities/User';
import {UserToBlockUser} from '@entities/UserToBlockUser';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {REPORT_TYPE} from '@shared/enums/enum';
import {IBlogPostRepository} from 'src/api/feed/interface/blogPost.interface';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {UserReportBlogPostRepository} from 'src/api/feed/repository/UserReportBlogPost.repository';
import {UserToBlogPostHideRepository} from 'src/api/feed/repository/UserToBlogPostHide.repository';
import {ImageService, IUploadS3Response} from 'src/api/image/image.service';
import {IUserToBlockUserRepository} from 'src/api/users/interface/userToBlockUser.interface';
import {UserToBlockUserRepository} from 'src/api/users/repository/UserToBlockUser.repository';
import {ICreateUser} from 'src/api/users/users.interface';
import {SocialLoginRequestDTO} from 'src/auth/dto/auth.dto';
import {KakaoService} from 'src/auth/kakao.service';
import {Connection, QueryRunner} from 'typeorm';
import {UserRepository} from './users.repository';

export interface test {
  nickname: string | null;
  fileUrl?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(BlogPostRepository)
    private readonly blogPostRepository: IBlogPostRepository,
    @InjectRepository(UserToBlogPostHideRepository)
    private readonly userToBlogPostHideRepository: UserToBlogPostHideRepository,
    @InjectRepository(UserReportBlogPostRepository)
    private readonly userReportBlogPostRepository: UserReportBlogPostRepository,
    @InjectRepository(UserToBlockUserRepository)
    private readonly userToBlockUserRepository: IUserToBlockUserRepository,
    private readonly kakaoService: KakaoService,
    private readonly imageService: ImageService,
    private connection: Connection,
  ) {}

  async saveUser(
    request: ICreateUser,
    file: Express.Multer.File,
  ): Promise<User> {
    const fileUrl = await this.getUserProfileImageUrl(file);
    return await this.userRepository.insertUser(request, fileUrl);
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

  async getUserFindOrFail(userId: number): Promise<User> {
    return await this.userRepository.selectUserFindOneOrFail(userId);
  }

  async logout(userId: number): Promise<void> {
    await this.userRepository.updateRefreshToken(userId, undefined);
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
      await this.userRepository.updateRefreshToken(
        userId,
        undefined,
        queryRunner,
      );
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

  async profileUpdate(
    userId: number,
    nickname?: string,
    file?: Express.Multer.File,
  ): Promise<void> {
    let requestFileUrl: string | undefined;
    if (file) {
      requestFileUrl = await this.getUserProfileImageUrl(file);
    }

    return await this.userRepository.updateUser(
      userId,
      nickname,
      requestFileUrl,
    );
  }

  async getUserProfileImageUrl(file: Express.Multer.File): Promise<string> {
    let resultS3: IUploadS3Response = {
      ok: true,
      ETag: undefined,
      Key: undefined,
      url: undefined,
    };
    try {
      // 1. image s3 upload
      resultS3 = await this.imageService.uploadS3(file, 'user');

      if (!resultS3.ok) {
        throw new HttpException(
          {
            error: 'S3 image upload failed',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const fileUrl = resultS3.url || '';

      return fileUrl;
    } catch (e) {
      if (resultS3.ok) {
        this.imageService.deleteS3(resultS3.Key || '');
      }
      throw new HttpException(
        {
          error: e.message,
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async checkDuplicateNickname(nickname: string): Promise<boolean> {
    const findNickname = await this.userRepository.selectUserNickname(nickname);
    return findNickname ? true : false;
  }

  public async hideBlogPost(userId: number, postId: number): Promise<void> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.userToBlogPostHideRepository.insertUserToBlogPostHide(
        userId,
        postId,
        queryRunner,
      );
      await this.blogPostRepository.updateBlogPostHideCount(
        postId,
        queryRunner,
      );

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

  public async reportBlogPost(
    userId: number,
    postId: number,
    reportType: REPORT_TYPE,
  ): Promise<void> {
    await this.userReportBlogPostRepository.insertUserReportBlogPost(
      userId,
      postId,
      reportType,
    );
  }

  public async blockUser(userId: number, blockUserId: number): Promise<void> {
    await this.userToBlockUserRepository.insertUserToBlockUser(
      userId,
      blockUserId,
    );
  }

  public async unblockUser(userId: number, blockUserId: number): Promise<void> {
    await this.userToBlockUserRepository.deleteUserToBlockUser(
      userId,
      blockUserId,
    );
  }

  public async getExcludeBockUsers(
    userIds: number[],
  ): Promise<UserToBlockUser[]> {
    try {
      return await this.userToBlockUserRepository.selectBlockUserByUser(
        userIds,
      );
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
