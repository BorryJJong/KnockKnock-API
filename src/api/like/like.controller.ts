import {User} from '@entities/User';
import {
  Controller,
  Param,
  Post,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {UsersService} from 'src/api/users/users.service';
import {JwtAuthGuard} from 'src/auth/jwt/jwt.guard';
import {LikeService} from './like.service';

@ApiTags('like')
@Controller('like')
@UseGuards(JwtAuthGuard)
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
    const requestUser: User = req.User;
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
    const requestUser: User = req.User;
    const user = await this.userService.getUser(requestUser.id);
    await this.likeService.feedUnLike(id, user.id);
    return true;
  }
}
