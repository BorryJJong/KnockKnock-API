import {
  Controller,
  Param,
  Post,
  Delete,
  UseGuards,
  Get,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {UsersService} from 'src/api/users/users.service';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';
import {GetListFeedLikeResDTO} from '../feed/dto/feed.dto';
import {LikeService} from './like.service';
import {UserDeco} from '@shared/decorator/user.decorator';
import {IUser} from 'src/api/users/users.interface';
import {ApiResponseDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly userService: UsersService,
  ) {}

  @Post('/feed/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '피드 좋아요'})
  @ApiCreatedResponse({
    description: '성공',
    status: HttpStatus.OK,
    type: ApiResponseDTO,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async feedLike(
    @Param('id') id: number,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void>> {
    try {
      await this.userService.getUser(user.id);
      await this.likeService.feedLike(id, user.id);
      return new ApiResponseDTO<void>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Delete('/feed/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '피드 좋아요 취소'})
  @ApiCreatedResponse({
    description: '성공',
    status: 200,
    type: Boolean,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async feedUnLike(
    @Param('id') id: number,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void>> {
    try {
      await this.userService.getUser(user.id);
      await this.likeService.feedUnLike(id, user.id);

      return new ApiResponseDTO<void>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Get('/feed/:id')
  @ApiOperation({summary: '피드 좋아요 목록'})
  @ApiCreatedResponse({
    description: '성공',
    type: GetListFeedLikeResDTO,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async getListFeedLike(
    @Param('id') id: number,
  ): Promise<ApiResponseDTO<GetListFeedLikeResDTO>> {
    try {
      const likes: GetListFeedLikeResDTO =
        await this.likeService.getListFeedLike(id);

      return new ApiResponseDTO<GetListFeedLikeResDTO>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        likes,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }
}
