import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {BlogPost} from 'src/entities/BlogPost';

export class CreateFeedDto extends OmitType(BlogPost, [
  'id',
  'hits',
  'modDate',
  'regDate',
  'delDate',
  'isDeleted',
] as const) {
  @ApiProperty({description: '프로모션 id', example: '1 or 1,2'})
  promotions: string;

  @ApiProperty({description: '챌린지 id', example: '1 or 1,2,3'})
  challenges: string;

  @ApiProperty({description: '이미지 binary data(multipart/form-data)'})
  images: Express.Multer.File[];
}

export class UpdateFeedDto extends PartialType(CreateFeedDto) {}
