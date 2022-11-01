import {Controller, Param, Post, Delete, Get, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import { GetListFeedLikeResponse } from '@shared/response_entities/feed/temp.response';
import { GetListFeedLikeResDTO } from '../feed/dto/feed.dto';
import {LikeService} from './like.service';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('/feed/:id')
  @ApiOperation({summary: '피드 좋아요'})
  @ApiCreatedResponse({
    description: '성공',
    type: Boolean,
  })
  async feedLike(
    @Param('id') id: number,
    @Query('userId') userId: number,
  ): Promise<boolean> {
    await this.likeService.feedLike(id, userId);
    return true;
  }

  @Delete('/feed/:id')
  @ApiOperation({summary: '피드 좋아요 취소'})
  @ApiCreatedResponse({
    description: '성공',
    type: Boolean,
  })
  async feedUnLike(
    @Param('id') id: number,
    @Query('userId') userId: number,
  ): Promise<boolean> {
    await this.likeService.feedUnLike(id, userId);
    return true;
  }

  @Get('/feed/:id')
  @ApiOperation({summary: '피드 좋아요 목록'})
  @ApiCreatedResponse({
    description: '성공',
    type: GetListFeedLikeResponse,
  })
  async getListFeedLike(@Param('id') id: number) {
    const result: GetListFeedLikeResponse = {
      code: 200,
      message: 'success',
      data: null,
    };

    try{
      const likes:GetListFeedLikeResDTO = await this.likeService.getListFeedLike(id);
      result.data = likes;
    } catch (e) {
      result.code = 500;
      result.message = e.message;
    }

    return result;
  }
}
