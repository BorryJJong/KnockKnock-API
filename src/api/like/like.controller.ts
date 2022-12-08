import {User} from '@entities/User';
import {
  Controller,
  Param,
  Post,
  Delete,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {UsersService} from 'src/api/users/users.service';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';
import {GetListFeedLikeResponse} from '@shared/response_entities/feed/temp.response';
import {GetListFeedLikeResDTO} from '../feed/dto/feed.dto';
import {LikeService} from './like.service';

@ApiTags('like')
@Controller('like')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly userService: UsersService,
  ) {}

  @Post('/feed/:id')
  @ApiOperation({summary: '피드 좋아요'})
  @ApiCreatedResponse({
    description: '성공',
    status: 200,
    type: Boolean,
  })
  async feedLike(@Param('id') id: number, @Request() req): Promise<boolean> {
    const requestUser: User = req.user;
    const user = await this.userService.getUser(requestUser.id);
    await this.likeService.feedLike(id, user.id);

    return true;
  }

  @Delete('/feed/:id')
  @ApiOperation({summary: '피드 좋아요 취소'})
  @ApiCreatedResponse({
    description: '성공',
    status: 200,
    type: Boolean,
  })
  async feedUnLike(@Param('id') id: number, @Request() req): Promise<boolean> {
    const requestUser: User = req.user;
    const user = await this.userService.getUser(requestUser.id);
    await this.likeService.feedUnLike(id, user.id);
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

    try {
      const likes: GetListFeedLikeResDTO =
        await this.likeService.getListFeedLike(id);
      result.data = likes;
    } catch (e) {
      result.code = 500;
      result.message = e.message;
    }

    return result;
  }
}
