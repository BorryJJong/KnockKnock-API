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
} from '@nestjs/common';
import {FeedService} from './feed.service';
import {
  CreateFeedDTO,
  UpdateFeedDTO,
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
} from './dto/feed.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {FilesInterceptor} from '@nestjs/platform-express';
import {ApiResponseDTO} from '@shared/dto/response.dto';
import {JwtOptionalGuard} from 'src/auth/jwt/jwtNoneRequired.guard';
import {FeedValidator} from 'src/api/feed/feed.validator';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';
import {UserDeco} from '@shared/decorator/user.decorator';
import {IUser} from 'src/api/users/users.interface';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';

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
  @ApiResponse({
    status: 200,
    description: '성공!!!',
    type: GetListFeedMainResDTO,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  public async getFeedsByChallengesFilter(
    @Query() query: GetListFeedMainReqDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<GetListFeedMainResDTO>> {
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
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
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
  @ApiResponse({
    status: 200,
    description: '성공!!!',
    type: GetListFeedResDTO,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  public async getListFeed(
    @Query() query: GetListFeedReqQueryDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<GetListFeedResDTO>> {
    try {
      const feeds = await this.feedService.getListFeed(query, user.id);
      return new ApiResponseDTO<GetListFeedResDTO>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        feeds,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Post()
  @ApiOperation({summary: '피드 등록'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '성공',
    type: Boolean,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createFeedDTO: CreateFeedDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<boolean>> {
    try {
      await this.feedValidator.checkPermissionCreateFeed(user.id);
      const status = await this.feedService.create(
        files,
        createFeedDTO,
        user.id,
      );
      return new ApiResponseDTO(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        status,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '피드 상세 조회'})
  @ApiResponse({
    description: '',
    type: GetFeedViewResDTO,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async getFeed(
    @Param() param: GetFeedViewReqDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<GetFeedViewResDTO>> {
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
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Post('/comment')
  @ApiOperation({summary: '댓글 등록'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '성공',
    type: Boolean,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async insertBlogComment(
    @UserDeco() user: IUser,
    @Body() insBlogCommentDTO: InsBlogCommentDTO,
  ) {
    try {
      await this.feedService.saveBlogComment(insBlogCommentDTO, user.id);
      return new ApiResponseDTO(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        true,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Get(':id/comment')
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '댓글 목록 조회'})
  @ApiResponse({
    description: '성공',
    type: [GetListFeedCommentResDTO],
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async getListFeedComment(
    @UserDeco() user: IUser,
    @Param() param: GetListFeedCommentReqDTO,
  ): Promise<ApiResponseDTO<GetListFeedCommentResDTO[]>> {
    try {
      const comments: GetListFeedCommentResDTO[] =
        await this.feedService.getListFeedComment(param, user.id);

      return new ApiResponseDTO<GetListFeedCommentResDTO[]>(
        200,
        API_RESPONSE_MEESAGE.SUCCESS,
        comments,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Delete('/comment/:id')
  @ApiOperation({summary: '댓글 삭제'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    description: '성공',
    type: Boolean,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async deleteBlogComment(
    @UserDeco() user: IUser,
    @Param() param: DelBlogCommentReqDTO,
  ): Promise<ApiResponseDTO<boolean>> {
    try {
      await this.feedValidator.checkFeedCommentAuthor(param.id, user.id);
      await this.feedService.deleteBlogComment(param);
      return new ApiResponseDTO<boolean>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        true,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Post('/update')
  @ApiOperation({summary: '피드 수정'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  @ApiCreatedResponse({
    description: '성공',
    type: Boolean,
  })
  async update(
    @Body() updateFeedDTO: UpdateFeedDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<boolean>> {
    try {
      await this.feedValidator.checkPermissionUpdateFeed(
        updateFeedDTO.id,
        user.id,
      );
      const status = await this.feedService.update(updateFeedDTO);
      return new ApiResponseDTO<boolean>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        status,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({summary: '피드 삭제'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '성공',
    type: Boolean,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async delete(
    @Param() param: DeleteFeedReqDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<boolean>> {
    try {
      await this.feedValidator.checkFeedAuthor(param.id, user.id);
      await this.feedService.delete(param);
      return new ApiResponseDTO<boolean>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        true,
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
