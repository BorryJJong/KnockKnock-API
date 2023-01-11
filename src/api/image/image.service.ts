import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as AWS from 'aws-sdk';
import 'dotenv/config';

export interface IUploadS3Response {
  ok: boolean;
  ETag?: string | undefined;
  Key?: string;
  url?: string;
}
@Injectable()
export class ImageService {
  private readonly S3: AWS.S3;
  private readonly region: string;
  private readonly buketName: string;
  private readonly ACL: string;
  private readonly logger = new Logger(ImageService.name);

  constructor(private readonly configService: ConfigService) {
    // (1) Region + Key 설정
    AWS.config.update({
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY') || '',
      },
      region: configService.get('AWS_REGION'),
    });
    // (2) S3객체,엑세스레밸 , 버킷이름+지역
    this.S3 = new AWS.S3();
    this.buketName = configService.get('AWS_S3_BUCKET_NAME') || '';
    this.region = configService.get('AWS_REGION') || '';
    this.ACL = 'public-read';
  }

  // 버킷 생성
  async __createBucket() {
    return await this.S3.createBucket({
      Bucket: this.buketName,
    }).promise();
  }

  // img src 생성
  __makePublicUrl(dest) {
    return `https://${this.buketName}.s3.${this.region}.amazonaws.com/${dest}`;
  }

  // (1) 폴더 업로드 - 폴더 미지정시 common
  async uploadS3(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<IUploadS3Response> {
    const Key = this.rename(file.originalname, file.mimetype);
    folder = folder ? folder : 'common';
    try {
      // console.log(`${this.buketName}/${folder}`);
      const result = await this.S3.putObject({
        Bucket: `${this.buketName}/${folder}`,
        ACL: this.ACL,
        Key,
        Body: file.buffer,
      }).promise();

      return {
        ok: true,
        ETag: result.ETag,
        Key: `${folder}/${Key}`,
        url: this.__makePublicUrl(`${folder}/${Key}`),
      };
    } catch (error) {
      this.logger.error(error);
      return {ok: false};
    }
  }

  // (1) 오브젝트 삭제
  async deleteS3(Key: string) {
    try {
      await this.S3.deleteObject({
        Bucket: this.buketName,
        Key,
      }).promise();
      return {ok: true};
    } catch (error) {
      this.logger.error(error);
    }
  }

  // 파일명
  rename(name: string, mimeType: string) {
    let extension;
    const newFileName =
      new Date().valueOf() + Math.random().toString(36).substr(2, 11);

    switch (mimeType) {
      case 'image/jpeg':
        extension = 'jpg';
        break;
      case 'image/png':
        extension = 'png';
        break;
      case 'image/gif':
        extension = 'gif';
        break;
      case 'image/bmp':
        extension = 'bmp';
        break;
      default:
        extension = 'jpg';
        break;
    }

    return `${newFileName}.${extension}`;
  }
}
