import {ApiProperty} from '@nestjs/swagger';
import {SOCIAL_TYPE} from '@shared/enums/enum';

export class UserInfoResDTO {
  @ApiProperty({type: String, example: 'jerry', description: '닉네임'})
  private nickname: string;

  @ApiProperty({enum: SOCIAL_TYPE, example: 'KAKAO', description: '소셜 종류'})
  private socialType: string;

  @ApiProperty({type: String, example: '', description: '회원 프로필 이미지'})
  private image: string;

  @ApiProperty({type: Date, example: '', description: '등록 날짜'})
  private regDate: Date;

  @ApiProperty({
    type: Date,
    required: false,
    example: '',
    description: '회원탈퇴 날짜',
  })
  private deletedAt: Date | null;

  constructor(
    nickname: string,
    socialType: SOCIAL_TYPE,
    image: string,
    regDate: Date,
    deletedAt: Date | null,
  ) {
    this.nickname = nickname;
    this.socialType = socialType;
    this.image = image;
    this.regDate = regDate;
    this.deletedAt = deletedAt;
  }
}

export class UpdateUserReqDTO {
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'jerry',
    description: '닉네임',
  })
  nickname?: string;

  @ApiProperty({
    description: '이미지 파일 업로드',
  })
  images: Express.Multer.File[];
}

export class GetCheckDuplicateUserNicknameReqDTO {
  @ApiProperty({
    type: String,
    nullable: false,
    example: 'jerry',
    description: '닉네임',
  })
  nickname: string;

  constructor(nickname: string) {
    this.nickname = nickname;
  }
}

export class GetUserResDTO {
  @ApiProperty({type: String, example: 'jerry', description: '닉네임'})
  private nickname: string;

  @ApiProperty({enum: SOCIAL_TYPE, example: 'KAKAO', description: '소셜 종류'})
  private socialType: string;

  @ApiProperty({type: String, example: '', description: '회원 프로필 이미지'})
  private image: string;

  @ApiProperty({type: Date, example: '', description: '회원 가입 날짜'})
  private regDate: Date;

  constructor(
    nickname: string,
    socialType: SOCIAL_TYPE,
    image: string,
    regDate: Date,
  ) {
    this.nickname = nickname;
    this.socialType = socialType;
    this.image = image;
    this.regDate = regDate;
  }
}
