import {Controller, Param, Post, Delete, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
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
}
