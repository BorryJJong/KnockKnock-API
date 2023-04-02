import {
  Controller,
  Param,
  Post,
  Delete,
  UseGuards,
  Get,
  HttpStatus,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';
import {GetListFeedLikeResDTO} from '../feed/dto/feed.dto';
import {LikeService} from './like.service';
import {UserDeco} from '@shared/decorator/user.decorator';
import {IUser} from 'src/api/users/users.interface';
import {ApiResponseDTO, ErrorDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';
import {LikeValidator} from 'src/api/like/like.validator';
import {
  ConflictApiResponseDTO,
  DefaultErrorApiResponseDTO,
  InternalServerApiResponseDTO,
  OkApiResponseListDataDTO,
  OkApiResponseNoneDataDTO,
} from '@shared/decorator/swagger.decorator';
import {JwtOptionalGuard} from 'src/auth/jwt/jwtNoneRequired.guard';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly likeValidator: LikeValidator,
  ) {}

  @Post('/feed/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '피드 좋아요'})
  @OkApiResponseNoneDataDTO()
  @ConflictApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async feedLike(
    @Param('id') id: number,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      await this.likeValidator.validLike(id, user.id, true);
      await this.likeService.feedLike(id, user.id);
      return new ApiResponseDTO<void>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Delete('/feed/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '피드 좋아요 취소'})
  @OkApiResponseNoneDataDTO()
  @ConflictApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async feedUnLike(
    @Param('id') id: number,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      await this.likeValidator.validLike(id, user.id, false);
      await this.likeService.feedUnLike(id, user.id);

      return new ApiResponseDTO<void>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get('/feed/:id')
  @ApiOperation({summary: '피드 좋아요 목록'})
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  @OkApiResponseListDataDTO(GetListFeedLikeResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async getListFeedLike(
    @UserDeco() user: IUser,
    @Param('id') id: number,
  ): Promise<ApiResponseDTO<GetListFeedLikeResDTO | ErrorDTO>> {
    try {
      const likes: GetListFeedLikeResDTO =
        await this.likeService.getListFeedLike(id, user.id);

      return new ApiResponseDTO<GetListFeedLikeResDTO>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        likes,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
