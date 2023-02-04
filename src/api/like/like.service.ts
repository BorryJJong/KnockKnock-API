import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {plainToInstance} from 'class-transformer';
import {GetFeedLikeDTO, GetListFeedLikeResDTO} from '../feed/dto/feed.dto';
import {BlogLikeRepository} from './repository/like.repository';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(BlogLikeRepository)
    private blogLikeRepository: BlogLikeRepository,
  ) {}

  async feedLike(id: number, userId: number): Promise<void> {
    await this.blogLikeRepository.insertFeedLike(id, userId);
  }

  async feedUnLike(id: number, userId: number): Promise<boolean> {
    await this.blogLikeRepository.deleteFeedLike(id, userId);
    return true;
  }

  async getListFeedLike(id: number): Promise<GetListFeedLikeResDTO> {
    try {
      const likes = await this.blogLikeRepository.getListFeedLike(id);
      const result: GetListFeedLikeResDTO = {
        postId: id,
        likes: plainToInstance(GetFeedLikeDTO, likes),
      };

      return result;
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
