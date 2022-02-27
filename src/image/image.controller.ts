import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import 'dotenv/config';

const s3 = new AWS.S3();

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 3, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        // ContentType: 'image/jpeg',
        ContentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
          let newFileName =
            new Date().valueOf() + Math.random().toString(36).substr(2, 11);
          let mimeType;
          switch (file.mimetype) {
            case 'image/jpeg':
              mimeType = 'jpg';
              break;
            case 'image/png':
              mimeType = 'png';
              break;
            case 'image/gif':
              mimeType = 'gif';
              break;
            case 'image/bmp':
              mimeType = 'bmp';
              break;
            default:
              mimeType = 'jpg';
              break;
          }

          cb(null, `${newFileName}.${mimeType}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFiles() files: Express.Multer.File) {
    return this.imageService.uploadImage(files);
  }
}
