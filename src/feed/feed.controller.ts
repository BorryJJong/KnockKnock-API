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

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

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
    let result = this.feedService.create(file, body);
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
