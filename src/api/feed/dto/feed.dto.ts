import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {BlogChallenges} from '../../../entities/BlogChallenges';
import {BlogPromotion} from '../../../entities/BlogPromotion';
import {BlogImage} from '../../../entities/BlogImage';
import {BlogPost} from '../../../entities/BlogPost';
import { BlogComment } from '../../../entities/BlogComment';
import { PagenationReqDTO, PagenationResDTO } from '../../../shared/dto/pagenation.dto';
import { Exclude, Expose, Type } from 'class-transformer';

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

export class GetListFeedReqDTO extends PagenationReqDTO {
  @ApiProperty({required: true, description: '챌린지ID', example: '1'})
  challengeId: number;
}
export class GetFeedResDTO {
  @ApiProperty({description: '피드ID', example: '1'})
  private id: number;

  @ApiProperty({
    description: '썸네일 이미지 url',
    example: '{aws.s3.endpoint}/feed/filename.png',
  })
  private thumbnailUrl: string;

  @ApiProperty({description: '이미지가 2장 이상일 경우 true', example: 'true'})
  private isImageMore: boolean;

  constructor(id: number, thumbnailUrl: string, isImageMore: boolean) {
    this.id = id;
    this.thumbnailUrl = thumbnailUrl;
    this.isImageMore = isImageMore;
  }
}

export class GetListFeedResDTO extends PagenationResDTO {
  @ApiProperty({
    description: '피드 목록',
    type: GetFeedResDTO,
    example: GetFeedResDTO,
  })
  feeds: GetFeedResDTO[];
}

export class GetListBlogImageByBlogPostResDTO {
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

// BlogComment
export class InsBlogCommentDTO extends OmitType(BlogComment, ['id', 'regDate', 'delDate', 'isDeleted',]) {};

@Exclude()
export class GetBlogCommentDTO {
  @Expose()
  @ApiProperty({
    description: '댓글 아이디',
    example: 1,
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: '사용자 아이디',
    example: 1,
  })
  userId: number;

  @Expose()
  @ApiProperty({
    description: '사용자 닉네임',
    example: '홍길동',
  })
  nickname: string;

  @Expose()
  @ApiProperty({
    description: '사용자 프로필 이미지',
    example: '{aws.s3.endpoint}/user/filename.png',
  })
  image: string;
  
  @Expose()
  @ApiProperty({
    description: '내용',
    example: '잘 봤습니다.',
  })
  content: string;

  @Expose()
  @ApiProperty({
    description: '등록 날짜',
    example: '시간 -> text 변환 작업 아직 안함',
  })
  regDate: Date;

  @Expose()
  @ApiProperty({
    description: '삭제 여부',
    example: 'false'
  })
  isDeleted: boolean;
};

@Exclude()
export class GetListFeedCommentResDTO extends GetBlogCommentDTO {
  @Expose()
  @Type(() => Number)
  @ApiProperty({description: '리댓글 개수', example: 5})
  replyCnt?: number;

  @Expose()
  @ApiProperty({description: '리댓글 목록', example: GetBlogCommentDTO, type: [GetBlogCommentDTO]})
  @Type(() => GetBlogCommentDTO)
  reply?: GetBlogCommentDTO[];
}

export class GetListFeedCommentReqDTO {
  @ApiProperty({description: '피드 id', example: '1'})
  id: number;
}