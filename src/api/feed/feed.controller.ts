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
} from '@nestjs/common';
import {FeedService} from './feed.service';
import {CreateFeedDto} from './dto/feed.dto';
import {UpdateFeedDto} from './dto/feed.dto';
import {ApiCreatedResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
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

  @Post()
  @ApiOperation({summary: '피드 등록'})
  @ApiCreatedResponse({
    description: '성공',
    type: FeedCreateResponse,
  })
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateFeedDto,
  ) {
    const status = await this.feedService.create(files, body);
    const result: FeedCreateResponse = {
      code: status ? 201 : 500,
      message: status ? '생성 성공' : '생성 실패',
      data: {
        status: status,
      },
    };
    return result;
  }

  // 피드검색 - 인기(3), 계정/태그/장소
  // list
  @Get()
  findAll() {
    return this.feedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
