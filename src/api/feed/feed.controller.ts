import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  UseGuards,
  HttpStatus,
  Put,
} from '@nestjs/common';
import {FeedService} from './feed.service';
import {
  GetListFeedMainResDTO,
  GetListFeedMainReqDTO,
  GetListFeedReqQueryDTO,
  GetListFeedResDTO,
  InsBlogCommentDTO,
  GetFeedViewReqDTO,
  GetFeedViewResDTO,
  GetListFeedCommentReqDTO,
  GetListFeedCommentResDTO,
  DelBlogCommentReqDTO,
  DeleteFeedReqDTO,
  UpdateFeedReqDTO,
  UpdateFeedReqParamDTO,
  CreateFeedDTOV2,
} from './dto/feed.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {FilesInterceptor} from '@nestjs/platform-express';
import {ApiResponseDTO, NoneDataDTO, ErrorDTO} from '@shared/dto/response.dto';
import {JwtOptionalGuard} from 'src/auth/jwt/jwtNoneRequired.guard';
import {FeedValidator} from 'src/api/feed/feed.validator';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';
import {UserDeco} from '@shared/decorator/user.decorator';
import {IUser} from 'src/api/users/users.interface';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';
import {
  DefaultErrorApiResponseDTO,
  ForbiddenApiResponseDTO,
  InternalServerApiResponseDTO,
  OkApiResponseDTO,
  OkApiResponseListDataDTO,
  OkApiResponseNoneDataDTO,
} from '@shared/decorator/swagger.decorator';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly feedValidator: FeedValidator,
  ) {}

  @Get('/main')
  @ApiOperation({
    summary: '피드 메인 API',
    externalDocs: {
      description: 'Figma링크',
      url: 'https://www.figma.com/file/1g4o56bPFBBzbGfpL29jo2/%23%EC%A0%9C%EB%A1%9C%EC%9B%A8%EC%9D%B4%EC%8A%A4%ED%8A%B8?node-id=1907%3A21526',
    },
    deprecated: false,
  })
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  @OkApiResponseDTO(GetListFeedMainResDTO)
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  public async getFeedsByChallengesFilter(
    @Query() query: GetListFeedMainReqDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<GetListFeedMainResDTO | ErrorDTO>> {
    try {
      const result = await this.feedService.getFeedsByChallengesFilter(
        query,
        user.id,
      );
      return new ApiResponseDTO<GetListFeedMainResDTO>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        result,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get('/blog-post')
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '피드 게시글 목록 API',
    externalDocs: {
      description: 'Figma링크',
      url: 'https://www.figma.com/file/1g4o56bPFBBzbGfpL29jo2/%23%EC%A0%9C%EB%A1%9C%EC%9B%A8%EC%9D%B4%EC%8A%A4%ED%8A%B8?node-id=1907%3A22097',
    },
    deprecated: false,
  })
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  @OkApiResponseDTO(GetListFeedResDTO)
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  public async getListFeed(
    @Query() query: GetListFeedReqQueryDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<GetListFeedResDTO | ErrorDTO>> {
    try {
      const feeds = await this.feedService.getListFeed(query, user.id);
      return new ApiResponseDTO<GetListFeedResDTO>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        feeds,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Post()
  @ApiOperation({summary: '피드 등록'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @OkApiResponseNoneDataDTO()
  @ForbiddenApiResponseDTO()
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createFeedDTO: CreateFeedDTOV2,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      await this.feedValidator.checkPermissionCreateFeed(user.id);
      await this.feedService.create(files, createFeedDTO, user.id);

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

  @Get(':id')
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '피드 상세 조회'})
  @OkApiResponseDTO(GetFeedViewResDTO)
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  async getFeed(
    @Param() param: GetFeedViewReqDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<GetFeedViewResDTO | ErrorDTO>> {
    try {
      const feed: GetFeedViewResDTO = await this.feedService.getFeed(
        param,
        user.id,
      );

      return new ApiResponseDTO<GetFeedViewResDTO>(
        200,
        API_RESPONSE_MEESAGE.SUCCESS,
        feed,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Post('/comment')
  @ApiOperation({summary: '댓글 등록'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @OkApiResponseNoneDataDTO()
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  async insertBlogComment(
    @UserDeco() user: IUser,
    @Body() insBlogCommentDTO: InsBlogCommentDTO,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      await this.feedService.saveBlogComment(insBlogCommentDTO, user.id);

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

  @Get(':id/comment')
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '댓글 목록 조회'})
  @OkApiResponseListDataDTO(GetListFeedCommentResDTO)
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  async getListFeedComment(
    @UserDeco() user: IUser,
    @Param() param: GetListFeedCommentReqDTO,
  ): Promise<ApiResponseDTO<GetListFeedCommentResDTO[] | ErrorDTO>> {
    try {
      const comments: GetListFeedCommentResDTO[] =
        await this.feedService.getListFeedComment(param, user.id);

      return new ApiResponseDTO<GetListFeedCommentResDTO[]>(
        200,
        API_RESPONSE_MEESAGE.SUCCESS,
        comments,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Delete('/comment/:id')
  @ApiOperation({summary: '댓글 삭제'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @OkApiResponseNoneDataDTO()
  @ForbiddenApiResponseDTO()
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  async deleteBlogComment(
    @UserDeco() user: IUser,
    @Param() param: DelBlogCommentReqDTO,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      await this.feedValidator.checkFeedCommentAuthor(param.id, user.id);
      await this.feedService.deleteBlogComment(param);

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

  @Put(':id')
  @ApiOperation({summary: '피드 수정'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @OkApiResponseNoneDataDTO()
  @ForbiddenApiResponseDTO()
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  async update(
    @Param() param: UpdateFeedReqParamDTO,
    @Body() updateFeedDTO: UpdateFeedReqDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      const {id} = param;
      await this.feedValidator.checkPermissionUpdateFeed(id, user.id);
      await this.feedService.update(id, updateFeedDTO);

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

  @Delete(':id')
  @ApiOperation({summary: '피드 삭제'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @OkApiResponseNoneDataDTO()
  @ForbiddenApiResponseDTO()
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  async delete(
    @Param() param: DeleteFeedReqDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<NoneDataDTO | ErrorDTO>> {
    try {
      await this.feedValidator.checkFeedAuthor(param.id, user.id);
      await this.feedService.delete(param);

      return new ApiResponseDTO<NoneDataDTO>(
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
}
