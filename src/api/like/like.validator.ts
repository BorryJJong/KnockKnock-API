import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BlogLikeRepository} from 'src/api/like/repository/like.repository';

@Injectable()
export class LikeValidator {
  constructor(
    @InjectRepository(BlogLikeRepository)
    private likeRepository: BlogLikeRepository,
  ) {}

  public async validLike(
    postId: number,
    userId: number,
    isLike: boolean,
  ): Promise<void> {
    const likeCount = await this.likeRepository.selectFeedByUser(
      postId,
      userId,
    );

    const message = `이미 피드를 ${isLike ? '좋아' : '안좋아'}합니다`;
    if (isLike) {
      if (likeCount === 1) this.getHttpException(message);
    } else {
      if (likeCount === 0) this.getHttpException(message);
    }
  }

  private getHttpException(message) {
    throw new HttpException(
      {
        message,
      },
      HttpStatus.CONFLICT,
    );
  }
}
