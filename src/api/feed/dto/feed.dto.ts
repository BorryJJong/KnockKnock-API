import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {BlogChallenges} from '../../../entities/BlogChallenges';
import {BlogPromotion} from '../../../entities/BlogPromotion';
import {BlogImage} from '../../../entities/BlogImage';
import {BlogPost} from '../../../entities/BlogPost';
import {
  PagenationRequestDTO,
  PagenationResponseDTO,
} from '../../../shared/dto/Pagenation.dto';

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
export class CreateBlogChallengesDTO extends OmitType(BlogChallenges, ['id']) {}

// BlogPromotion
export class CreateBlogPromotionDTO extends OmitType(BlogPromotion, ['id']) {}

// BlogImage
export class CreateBlogImageDTO extends OmitType(BlogImage, ['id']) {}
export class UpdateFeedDto extends PartialType(CreateFeedDTO) {}

export class GetFeedsRequestDTO extends PagenationRequestDTO {
  @ApiProperty({required: true, description: '챌린지ID', example: '1'})
  challengeId: number;
}
export class GetFeedResponseDTO {
  @ApiProperty({description: '피드ID', example: '1'})
  private id: number;

  @ApiProperty({
    description: '썸네일 이미지 url',
    example: '{aws.s3.endpoint}/feed/filename.png',
  })
  private thumbnailUrl: string;

  @ApiProperty({description: '이미지가 2장 이상일 경우 true', example: 'true'})
  private isImageMore: boolean;

  // 여기서하는게 맞는걸까? 맞는거 같기도..아닌거같기도..레이어로 나눠야하나?
  constructor(id: number, thumbnailUrl: string, isImageMore: boolean) {
    this.id = id;
    this.thumbnailUrl = thumbnailUrl;
    this.isImageMore = isImageMore;
  }
}

export class GetFeedsResponseDTO extends PagenationResponseDTO {
  @ApiProperty({
    description: '피드 목록',
    type: GetFeedResponseDTO,
    example: GetFeedResponseDTO,
  })
  feeds: GetFeedResponseDTO[];
}

export class GetBlogImagesByBlogPostDTO {
  @ApiProperty({description: '피드ID', example: '1'})
  private postId: number;

  @ApiProperty({
    description: '블로그의 이미지 URL',
    example: '{aws.s3.endpoint}/feed/filename.png',
  })
  private fileUrl: string;

  constructor(id: number, fileUrl: string) {
    this.postId = id;
    this.fileUrl = fileUrl;
  }
}
