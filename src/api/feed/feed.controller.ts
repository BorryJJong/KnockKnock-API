import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import {FeedService} from './feed.service';
import {
  CreateFeedDTO,
  UpdateFeedDTO,
  GetFeedsRequestDTO,
  GetFeedsResponseDTO,
} from './dto/feed.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {FilesInterceptor} from '@nestjs/platform-express';
import {FeedCreateResponse} from 'src/shared/response_entities/feed/temp.response';

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
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @ApiOperation({
    summary: '피드 목록 API',
    externalDocs: {
      description: 'Figma링크',
      url: 'https://www.figma.com/file/1g4o56bPFBBzbGfpL29jo2/%23%EC%A0%9C%EB%A1%9C%EC%9B%A8%EC%9D%B4%EC%8A%A4%ED%8A%B8?node-id=1907%3A21526',
    },
    deprecated: false,
  })
  @ApiResponse({
    status: 200,
    description: '성공!!!',
    type: [GetFeedsResponseDTO],
  })
  public async getFeedsByChallengesFilter(
    @Query() query: GetFeedsRequestDTO,
  ): Promise<GetFeedsResponseDTO> {
    return this.feedService.getFeedsByChallengesFilter(query);
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
    //return;
    const status = await this.feedService.create(files, createFeedDTO);
    const result: FeedCreateResponse = {
      code: status ? 201 : 500,
      message: status ? '생성 성공' : '생성 실패',
      data: {
        status: status,
      },
    };
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedDTO: UpdateFeedDTO) {
    return this.feedService.update(+id, updateFeedDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
