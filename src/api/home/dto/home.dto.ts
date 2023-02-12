import {ApiProperty} from '@nestjs/swagger';
import {EVENT_TAP} from '@shared/enums/enum';

export class GetListHotFeedResDTO {
  @ApiProperty({description: '게시글 id', example: '1'})
  private postId: number;

  @ApiProperty({description: '게시글 내 이미지의 비율', example: '1:1'})
  private scale: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: '홍길동',
  })
  private nickname: string;

  @ApiProperty({
    description: '블로그의 이미지 URL',
    example: '{aws.s3.endpoint}/feed/filename.png',
  })
  private fileUrl: string;

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

export class GetHomeListEventResDTO {
  @ApiProperty({
    description: '이벤트 ID',
    example: '1',
    nullable: false,
    required: true,
  })
  private id: number;

  @ApiProperty({
    description: 'New 뱃지 여부(생성일 2주이내)',
    example: 'true',
    nullable: false,
    required: true,
  })
  private isNewBadge: boolean;

  @ApiProperty({
    description: '이벤트 제목',
    example: '[스타벅스] 지구의날 온라인',
    nullable: false,
    required: true,
  })
  private title: string;

  @ApiProperty({
    description: '이벤트 기간',
    example: '시작일~종료일(혹은 미정) / YYYY.MM.DD ~ YYYY.MM.DD or 미정',
    nullable: false,
    required: true,
  })
  private eventPeriod: string;

  @ApiProperty({
    description: '이벤트 대표 이미지 URL',
    example: '{aws.s3.endpoint}/event/filename.png',
    nullable: false,
    required: true,
  })
  image: string;

  constructor(
    id: number,
    isNewBadge: boolean,
    title: string,
    eventPeriod: string,
    image: string,
  ) {
    this.id = id;
    this.isNewBadge = isNewBadge;
    this.title = title;
    this.eventPeriod = eventPeriod;
    this.image = image;
  }
}

export class GetListEventResDTO {
  @ApiProperty({
    description: '이벤트 ID',
    example: '1',
    nullable: false,
    required: true,
  })
  private id: number;

  @ApiProperty({
    description: 'New 뱃지 여부(생성일 2주이내)',
    example: 'true',
    nullable: false,
    required: true,
  })
  private isNewBadge: boolean;

  @ApiProperty({
    description: '이벤트 종료 여부',
    example: 'true',
    nullable: false,
    required: true,
  })
  private isEndEvent: boolean;

  @ApiProperty({
    description: '이벤트 제목',
    example: '[스타벅스] 지구의날 온라인',
    nullable: false,
    required: true,
  })
  private title: string;

  @ApiProperty({
    description: '이벤트 기간',
    example: '시작일~종료일(혹은 미정) / YYYY.MM.DD ~ YYYY.MM.DD or 미정',
    nullable: false,
    required: true,
  })
  private eventPeriod: string;

  @ApiProperty({
    description: '이벤트 대표 이미지 URL',
    example: '{aws.s3.endpoint}/event/filename.png',
    nullable: false,
    required: true,
  })
  image: string;

  @ApiProperty({
    description: '이벤트 홈페이지 URL',
    example: 'https://github.com',
    nullable: false,
    required: true,
  })
  url: string;

  constructor(
    id: number,
    isNewBadge: boolean,
    isEndEvent: boolean,
    title: string,
    eventPeriod: string,
    image: string,
    url: string,
  ) {
    this.id = id;
    this.isNewBadge = isNewBadge;
    this.isEndEvent = isEndEvent;
    this.title = title;
    this.eventPeriod = eventPeriod;
    this.image = image;
    this.url = url;
  }
}

export class GetListEventReqQueryDTO {
  @ApiProperty({
    required: true,
    default: EVENT_TAP.ONGOING,
    enum: EVENT_TAP,
    description: '이벤트 탭별 조회(default 진행중)',
    example: 'ONGOING',
  })
  eventTap: EVENT_TAP;
}
