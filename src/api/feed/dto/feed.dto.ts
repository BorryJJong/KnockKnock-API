import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import { BlogChallenges } from '../../../entities/BlogChallenges';
import { BlogPromotion } from '../../../entities/BlogPromotion';
import { BlogImage } from '../../../entities/BlogImage';
import { BlogPost } from '../../../entities/BlogPost';

export class CreateFeedDTO extends OmitType(BlogPost, [
  'id',
  'hits',
  'modDate',
  'regDate',
  'delDate',
  'isDeleted',
] as const) {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: '프로모션 id', example: '1 or 1,2'})
  promotions: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: '챌린지 id', example: '1 or 1,2,3'})
  challenges: string;

  // TODO: 파일은 custom validator? 
  // https://server-talk.tistory.com/183
  // https://github.com/typestack/class-validator 아니면 @isMimeType?
  // https://github.com/typestack/class-validator#custom-validation-decorators
  // https://stackoverflow.com/questions/60680641/is-there-any-way-to-implement-validation-for-file-upload-using-class-validator
  @ApiProperty({description: '이미지 binary data(multipart/form-data)'})
  images: Express.Multer.File[];
}

export class UpdateFeedDTO extends PartialType(CreateFeedDTO) {}

// BlogPost
export class CreateBlogPostDTO extends OmitType(BlogPost, [
  'id',
  'hits',
  'modDate',
  'regDate',
  'delDate',
  'isDeleted',
] as const) {}

// BlogChallenges
export class CreateBlogChallengesDTO extends OmitType(BlogChallenges, ['id']) {};

// BlogPromotion
export class CreateBlogPromotionDTO extends OmitType(BlogPromotion, ['id']) {};

// BlogImage
export class CreateBlogImageDTO extends OmitType(BlogImage, ['id']) {};
