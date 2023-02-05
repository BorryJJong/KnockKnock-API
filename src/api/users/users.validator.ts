import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {IUserReportBlogPostRepository} from 'src/api/feed/interface/userReportBlogPost.interface';
import {UserReportBlogPostRepository} from 'src/api/feed/repository/UserReportBlogPost.repository';
import {IUserRepository} from 'src/api/users/users.interface';
import {UserRepository} from 'src/api/users/users.repository';

@Injectable()
export class UserValidator {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
    @InjectRepository(UserReportBlogPostRepository)
    private userReportBlogPostRepository: IUserReportBlogPostRepository,
  ) {}

  public async checkExistSocialUser(
    socialUuid: string,
    socialType: SOCIAL_TYPE,
  ): Promise<void> {
    const user = await this.userRepository.isExistSocialUser(
      socialUuid,
      socialType,
    );

    if (user) {
      throw new HttpException(
        {
          message: '이미 존재하는 회원입니다',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  public async checkDuplicateNickname(nickname: string): Promise<void> {
    const findNickname = await this.userRepository.selectUserNickname(nickname);

    if (findNickname) {
      throw new HttpException(
        {
          message: `'${findNickname}' 닉네임은 중복입니다`,
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  public async alreadyReportBlogPost(
    userId: number,
    postId: number,
  ): Promise<void> {
    const reportId =
      await this.userReportBlogPostRepository.selectUserReportBlogPostByUser(
        userId,
        postId,
      );

    if (reportId) {
      throw new HttpException(
        {
          message: '이미 신고된 게시글입니다',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
