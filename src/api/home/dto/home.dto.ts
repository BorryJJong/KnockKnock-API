import {ApiProperty} from '@nestjs/swagger';

export class GetListHotFeedResDTO {
  @ApiProperty({description: '게시글 id', example: '1'})
  postId: number;

  @ApiProperty({description: '게시글 내 이미지의 비율', example: '1:1'})
  scale: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: '홍길동',
  })
  nickname: string;

  @ApiProperty({
    description: '블로그의 이미지 URL',
    example: '{aws.s3.endpoint}/feed/filename.png',
  })
  fileUrl: string;

  constructor(
    postId: number,
    scale: string,
    nickname: string,
    fileUrl: string,
  ) {
    this.postId = postId;
    this.scale = scale;
    this.nickname = nickname;
    this.fileUrl = fileUrl;
  }
}

export class GetListHotFeedReqDTO {
  @ApiProperty({description: '챌린지 id', example: '1'})
  challengeId: number;

  constructor(challengeId: number) {
    this.challengeId = challengeId;
  }
}
