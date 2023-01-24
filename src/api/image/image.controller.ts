import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ImageService} from './image.service';
import 'dotenv/config';
import {ApiOperation} from '@nestjs/swagger';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiOperation({summary: '이미지 테스트용 API'})
  @UseInterceptors(FileInterceptor('images'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadS3(file);
  }
}
