import {ApiProperty} from '@nestjs/swagger';
import {BANNER_TARGET_SCREEN, BANNER_TYPE, EVENT_TAP} from '@shared/enums/enum';

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
  private image: string;

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
  private image: string;

  @ApiProperty({
    description: '이벤트 홈페이지 URL',
    example: 'https://github.com',
    nullable: false,
    required: true,
  })
  private url: string;

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

export class GetListBannerReqQueryDTO {
  @ApiProperty({
    required: true,
    enum: BANNER_TYPE,
    description: '배너 종류별 목록 조회',
    example: 'MAIN',
  })
  bannerType: BANNER_TYPE;
}

export class GetListBannerResDTO {
  @ApiProperty({
    description: '배너 ID',
    example: '1',
    nullable: false,
    required: true,
  })
  private id: number;

  @ApiProperty({
    description: '배너 이미지 URL',
    example: '{aws.s3.endpoint}/event/filename.png',
    nullable: false,
    required: true,
  })
  private image: string;

  @ApiProperty({
    required: true,
    enum: BANNER_TYPE,
    description: '배너 타입(MAIN, BAR)',
    example: 'MAIN',
  })
  private type: BANNER_TYPE;

  @ApiProperty({
    required: false,
    nullable: true,
    enum: BANNER_TARGET_SCREEN,
    description: '배너 이동화면',
    example: 'FEED_WRITE',
  })
  private targetScreen?: BANNER_TARGET_SCREEN;

  constructor(
    id: number,
    image: string,
    type: BANNER_TYPE,
    targetScreen?: BANNER_TARGET_SCREEN,
  ) {
    this.id = id;
    this.image = image;
    this.type = type;
    this.targetScreen = targetScreen;
  }
}

export class GetHomeListVerifiredShopResDTO {
  @ApiProperty({
    description: '매장명',
    example: '제로띵스',
    nullable: false,
    required: true,
  })
  private name: string;

  @ApiProperty({
    description: '매장 설명',
    example: '일상에 스며드는 초록색 소비를 제안합니다',
    nullable: false,
    required: true,
  })
  private description: string;

  @ApiProperty({
    description: '매장 이미지',
    example: '{aws.s3.endpoint}/event/filename.png',
    nullable: false,
    required: true,
  })
  private image: string;

  @ApiProperty({
    description: '상점의 프로모션 이름들',
    example: '[텀블러 할인, 사은품 증정]',
    nullable: false,
    required: true,
  })
  private shopPromotionNames: string[];

  constructor(
    name: string,
    description: string,
    image: string,
    shopPromotionNames: string[],
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.shopPromotionNames = shopPromotionNames;
  }
}

export class GetListVerifiredShopResDTO {
  @ApiProperty({
    description: '상점 ID',
    example: '1',
    nullable: false,
    required: true,
  })
  private id: number;

  @ApiProperty({
    description: '매장명',
    example: '제로띵스',
    nullable: false,
    required: true,
  })
  private name: string;

  @ApiProperty({
    description: '매장 설명',
    example: '일상에 스며드는 초록색 소비를 제안합니다',
    nullable: false,
    required: true,
  })
  private description: string;

  @ApiProperty({
    description: '매장 이미지',
    example: '{aws.s3.endpoint}/event/filename.png',
    nullable: false,
    required: true,
  })
  private image: string;

  @ApiProperty({
    description: '상점의 프로모션 이름들',
    example: '[텀블러 할인, 사은품 증정]',
    nullable: false,
    required: true,
  })
  private shopPromotionNames: string[];

  @ApiProperty({
    description: '인증된 상점 홈페이지 URL or 주소',
    example: 'https://github.com',
    nullable: false,
    required: true,
  })
  private url: string;

  @ApiProperty({
    description: '매장 주소 x좌표(위도)',
    example: '126.9903113',
    required: true,
    nullable: false,
  })
  locationX: string;

  @ApiProperty({
    description: '매장 주소 y좌표(경도)',
    example: '37.3771012046504',
    required: true,
    nullable: false,
  })
  locationY: string;

  constructor(
    id: number,
    name: string,
    description: string,
    image: string,
    shopPromotionNames: string[],
    url: string,
    locationX: string,
    locationY: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.shopPromotionNames = shopPromotionNames;
    this.url = url;
    this.locationX = locationX;
    this.locationY = locationY;
  }
}
