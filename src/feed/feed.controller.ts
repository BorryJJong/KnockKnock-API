import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  private readonly logger = new Logger(FeedController.name);

  constructor(
    private readonly feedService: FeedService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @ApiOperation({ summary: '피드 등록' })
  @ApiOkResponse({
    description: '성공',
    type: CreateFeedDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @UseInterceptors(FileInterceptor('images'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFeedDto,
  ) {
    // TODO: 파일 1개 업로드임 n개 업로드 가능하도록 수정 필요.
    // TODO: 에러 통일 해야함 일단 무조건 return false; 사용함.
    let resultS3;

    // 1. image s3 upload
    if (file !== undefined) {
      /*{
        ok: true,
        ETag: '"78c77202283e50fecd8eab89304a617b"',
        Key: '1646446656103sv90vbzqved.image/jpeg',
        url: 'https://kej-test.s3.ap-northeast-2.amazonaws.com/feed/1646446656103sv90vbzqved.image/jpeg'
      }*/
      resultS3 = await this.imageService.uploadS3(file, 'feed');
      if (!resultS3.ok) {
        this.logger.error('S3 image upload failed');
        return false;
      }
    }

    // 2. other data save
    // let result = this.feedService.create(body);

    // 3. save image info(post id 받아서)
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
