import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

@Injectable()
export class ImageService {
  async uploadImage(files) {
    // TODO: 저장안됐을때 상황 고려안함 추후 수정
    console.log(files);
    return 'SUCESS';
  }
}
