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
  Request,
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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {FilesInterceptor} from '@nestjs/platform-express';
import {
  FeedCreateResponse,
  GetFeedViewResponse,
  GetFeedCommentResponse,
  DeleteBlogCommentResponse,
  UpdateFeedResponse,
} from 'src/shared/response_entities/feed/temp.response';
import {User} from '@entities/User';
import {JwtOptionalGuard} from 'src/auth/jwt/jwtNoneRequired.guard';
import {FeedValidator} from 'src/api/feed/feed.validator';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';

// TODO: 400,401,403,404등 공통 사용 응답코드는 컨트롤러에 붙이기
// @ApiBadRequestResponse({
//   description: '필수 인자가 없습니다.',
//   type: HttpError4xxDto,
// })
// @ApiUnauthorizedResponse({ description: '인증실패', type: HttpError4xxDto })
// @ApiForbiddenResponse({ description: '권한(인가)부족', type: HttpError4xxDto })
// @ApiNotFoundResponse({ description: '해당 리소스 없음', type: HttpError4xxDto })
// @ApiBearerAuth('accesskey')

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
  public async getFeedsByChallengesFilter(
    @Query() query: GetListFeedMainReqDTO,
  ): Promise<GetListFeedMainResDTO> {
    return this.feedService.getFeedsByChallengesFilter(query);
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
    type: [GetListFeedResDTO],
  })
  public async getListFeed(
    @Query() query: GetListFeedReqQueryDTO,
    @Request() req,
  ): Promise<GetListFeedResDTO> {
    const user: User = req.user;
    return this.feedService.getListFeed(query, user.id);
  }

  @Post()
  @ApiOperation({summary: '피드 등록'})
  @ApiCreatedResponse({
    description: '성공',
    type: FeedCreateResponse,
  })
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createFeedDTO: CreateFeedDTO,
  ) {
    const status = await this.feedService.create(files, createFeedDTO);
    const result: FeedCreateResponse = {
      code: status ? 201 : 500,
      message: status ? '성공' : '실패',
      data: {
        status: status,
      },
    };
    return result;
  }

  @Get(':id')
  @UseGuards(JwtOptionalGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '피드 상세 조회'})
  @ApiResponse({
    description: '',
    type: GetFeedViewResponse,
  })
  async getFeed(@Param() param: GetFeedViewReqDTO, @Request() req) {
    const user: User = req.user;
    const result: GetFeedViewResponse = {
      code: 200,
      message: 'success',
      data: null,
    };

    try {
      const feed: GetFeedViewResDTO = await this.feedService.getFeed(
        param,
        user.id,
      );
      result.data = feed;
    } catch (e) {
      result.code = 500;
      result.message = e.message;
    }

    return result;
  }

  @Post('/comment')
  @ApiOperation({summary: '댓글 등록'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '성공',
    type: FeedCreateResponse,
  })
  async insertBlogComment(
    @Request() req,
    @Body() insBlogCommentDTO: InsBlogCommentDTO,
  ) {
    const result: FeedCreateResponse = {
      code: 201,
      message: 'success',
      data: {
        status: true,
      },
    };

    try {
      const user: User = req.user;
      await this.feedService.saveBlogComment(insBlogCommentDTO, user.id);
    } catch (e) {
      result.code = 500;
      result.message = e.message;
      result.data.status = false;
    }

    return result;
  }

  @Get(':id/comment')
  @ApiOperation({summary: '댓글 목록 조회'})
  @ApiResponse({
    description: '성공',
    type: GetFeedCommentResponse,
  })
  async getListFeedComment(@Param() param: GetListFeedCommentReqDTO) {
    const result: GetFeedCommentResponse = {
      code: 200,
      message: 'success',
      data: null,
    };

    try {
      const comments: GetListFeedCommentResDTO[] =
        await this.feedService.getListFeedComment(param);
      result.data = comments;
    } catch (e) {
      result.code = 500;
      result.message = e.message;
    }

    return result;
  }

  @Delete('/comment/:id')
  @ApiOperation({summary: '댓글 삭제'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    description: '성공',
    type: DeleteBlogCommentResponse,
  })
  async deleteBlogComment(
    @Request() req,
    @Param() param: DelBlogCommentReqDTO,
  ) {
    const result: DeleteBlogCommentResponse = {
      code: 200,
      message: 'success',
      data: {
        status: true,
      },
    };

    try {
      const user: User = req.user;
      await this.feedValidator.checkFeedCommentAuthor(param.id, user.id);
      await this.feedService.deleteBlogComment(param);
    } catch (e) {
      result.code = 500;
      result.message = e.message;
      result.data.status = false;
    }

    return result;
  }

  @Post('/update')
  @ApiOperation({summary: '피드 수정'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '성공',
    type: UpdateFeedResponse,
  })
  async update(@Body() updateFeedDTO: UpdateFeedDTO) {
    const status = await this.feedService.update(updateFeedDTO);
    const result: UpdateFeedResponse = {
      code: status ? 201 : 500,
      message: status ? '성공' : '실패',
      data: {
        status: status,
      },
    };
    return result;
  }

  @Delete(':id')
  @ApiOperation({summary: '피드 삭제'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '성공',
    type: Boolean,
  })
  async delete(
    @Param() param: DeleteFeedReqDTO,
    @Request() req,
  ): Promise<boolean> {
    const user: User = req.user;
    await this.feedValidator.checkFeedAuthor(param.id, user.id);
    await this.feedService.delete(param);

    return true;
  }
}
