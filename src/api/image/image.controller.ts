import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ImageService} from './image.service';
import multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import 'dotenv/config';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('images'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() body) {
    return this.imageService.uploadS3(file);
  }
}
