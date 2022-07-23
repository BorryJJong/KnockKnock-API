import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {BlogChallenges} from '../../../entities/BlogChallenges';
import {BlogPromotion} from '../../../entities/BlogPromotion';
import {BlogImage} from '../../../entities/BlogImage';
import {BlogPost} from '../../../entities/BlogPost';
import {
  PagenationReqDTO,
  PagenationResDTO,
} from '../../../shared/dto/Pagenation.dto';
import {IGetBlogImagesByBlogPost} from '../interface/blogImage.interface';

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

export class GetListFeedMainReqDTO extends PagenationReqDTO {
  @ApiProperty({required: true, description: '챌린지ID', example: '1'})
  challengeId: number;
}

export class GetFeedMainResDTO {
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

export class GetListFeedMainResDTO extends PagenationResDTO {
  @ApiProperty({
    description: '피드 메인 목록',
    type: GetFeedMainResDTO,
    example: GetFeedMainResDTO,
  })
  feeds: GetFeedMainResDTO[];
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

export class GetListFeedReqQueryDTO extends PagenationReqDTO {
  @ApiProperty({required: false, description: '챌린지ID', example: '1'})
  challengeId?: number;
}

export class GetListFeedReqParamDTO {
  @ApiProperty({required: true, description: '피드ID', example: '1'})
  feedId: number;
}

export class GetFeedImageResDTO {
  @ApiProperty({description: '피드 이미지 id', example: '1'})
  private id: number;

  @ApiProperty({
    description: '피드 이미지 url',
    example: '[{aws.s3.endpoint}/feed/filename.png]',
  })
  private fileUrl: string;

  constructor(id: number, fileUrl: string) {
    this.id = id;
    this.fileUrl = fileUrl;
  }
}

export class GetFeedResDTO {
  @ApiProperty({description: '피드ID', example: '1'})
  private id: number;

  @ApiProperty({description: '글쓴이 닉네임', example: 'sungmin_kim94'})
  private userName: string;

  @ApiProperty({description: '작성 시간(생성일)', example: '1시간전'})
  private regDateToString: string;

  @ApiProperty({
    description: '피드 이미지 목록',
    type: GetFeedImageResDTO,
    example: GetFeedImageResDTO,
  })
  blogImages: GetFeedImageResDTO[];

  @ApiProperty({description: '좋아요 개수', example: '1,301'})
  private blogLikeCount: string;

  @ApiProperty({description: '좋아요 선택 여부', example: 'true'})
  private isLike: boolean;

  @ApiProperty({description: '댓글 개수', example: '2,456'})
  private blogCommentCount: string;

  constructor(
    id: number,
    userName: string,
    regDateToString: string,
    blogLikeCount: string,
    isLike: boolean,
    blogCommentCount: string,
    blogImages: IGetBlogImagesByBlogPost[],
  ) {
    this.id = id;
    this.userName = userName;
    this.regDateToString = regDateToString;
    this.blogLikeCount = blogLikeCount;
    this.isLike = isLike;
    this.blogCommentCount = blogCommentCount;
    this.blogImages = blogImages.map(
      blogImage => new GetFeedImageResDTO(blogImage.id, blogImage.fileUrl),
    );
  }
}

export class GetListFeedResDTO extends PagenationResDTO {
  @ApiProperty({
    description: '피드 게시글 목록',
    type: GetFeedResDTO,
    example: GetFeedResDTO,
  })
  feeds: GetFeedResDTO[];
}
