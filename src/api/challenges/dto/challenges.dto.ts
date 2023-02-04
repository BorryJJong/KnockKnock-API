import {ApiProperty, PickType} from '@nestjs/swagger';
import {CHALLENGES_SORT} from '@shared/enums/enum';
import {Column} from 'typeorm';
import {Challenges} from '../../../entities/Challenges';
import {IChallengeTitle} from '../challenges.interface';
export class ChallengeSubContentDTO {
  @ApiProperty({description: '제목', example: '제목'})
  private readonly title: string;

  @ApiProperty({description: '이미지', example: 'url'})
  private readonly image: string;

  @ApiProperty({description: '내용', example: '내용'})
  private readonly content: string;

  constructor(title: string, image: string, content: string) {
    this.title = title;
    this.image = image;
    this.content = content;
  }
}

export class ChallengeContentDTO {
  @ApiProperty({description: '서브 컨텐츠 이미지', example: 'url'})
  private image: string;

  @ApiProperty({
    description: '방법',
    example: '[방법]',
    isArray: true,
    required: true,
  })
  private rule: string[];

  @ApiProperty({
    description: '챌린지 서브 내용',
    example: ChallengeSubContentDTO,
    type: [ChallengeSubContentDTO],
  })
  private subContents: ChallengeSubContentDTO[];

  constructor(
    image: string,
    rule: string[],
    subContents: ChallengeSubContentDTO[],
  ) {
    this.image = image;
    this.rule = rule;
    this.subContents = subContents;
  }
}

export class ParticipantUserDTO {
  @ApiProperty({description: '사용자ID', example: '1'})
  readonly id: number;

  @ApiProperty({description: '이미지 URL', example: '1'})
  readonly image: string;

  constructor(id: number, image: string) {
    this.id = id;
    this.image = image;
  }
}

export class insChallengeReqDTO extends PickType(Challenges, [
  'title',
  'subTitle',
  'content',
] as const) {}

export class GetChallengeReqDTO {
  @ApiProperty({description: '챌린지ID', example: '1', required: true})
  id: number;
}

export class GetChallengeResDTO extends PickType(Challenges, [
  'id',
  'title',
  'subTitle',
  'content',
  'regDate',
] as const) {}

export class GetChallengeDetailResDTO {
  @ApiProperty({description: '챌린지 id', example: '1'})
  private readonly id: number;

  @ApiProperty({
    description: '챌린지명',
    example: '용기내챌린지',
    required: true,
  })
  private readonly title: string;

  @ApiProperty({
    description: '서브타이틀',
    example: '용기내챌린지',
    required: true,
  })
  private readonly subTitle: string;

  @ApiProperty({
    description: '챌린지 상세 메인 이미지',
    example: '챌린지 상세 메인 목록 이미지',
    required: true,
  })
  private readonly contentImage: string;

  @ApiProperty({
    description: '챌린지 참여자 목록',
    isArray: true,
    required: true,
    type: [ParticipantUserDTO],
    example: ParticipantUserDTO,
  })
  private readonly participants: ParticipantUserDTO[];

  @ApiProperty({
    description: '챌린지 내용',
    example: ChallengeContentDTO,
    type: ChallengeContentDTO,
  })
  private readonly content: ChallengeContentDTO;

  constructor(
    id: number,
    title: string,
    subTitle: string,
    contentImage: string,
    participants: ParticipantUserDTO[],
    content: ChallengeContentDTO,
  ) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.contentImage = contentImage;
    this.participants = participants;
    this.content = content;
  }
}

export class GetListChallengeResDTO extends PickType(Challenges, [
  'id',
  'title',
  'subTitle',
  'content',
  'regDate',
  'mainImage',
  'contentImage',
] as const) {
  @Column({
    name: 'new_yn',
    nullable: true,
  })
  newYn: string;

  @Column({
    name: 'post_cnt',
    nullable: true,
  })
  postCnt: number;

  @Column({
    name: 'rnk',
    nullable: true,
  })
  rnk: number;

  @ApiProperty({
    description: '챌린지 참여자 목록',
    example: '[]',
    isArray: true,
    required: true,
    type: [ParticipantUserDTO],
  })
  participants: ParticipantUserDTO[];
}

export class GetListChallengeResDTOV2 {
  @ApiProperty({description: '챌린지 id', example: '1'})
  id: number;

  @ApiProperty({
    description: '챌린지명',
    example: '용기내챌린지',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: '서브타이틀',
    example: '용기내챌린지',
    required: true,
  })
  subTitle: string;

  @ApiProperty({
    description: '챌린지 목록 이미지',
    example: '챌린지 목록 이미지',
    required: true,
  })
  mainImage: string;

  @ApiProperty({
    description: 'Hot 여부',
    example: 'true',
    nullable: false,
  })
  isHotBadge: boolean;

  @ApiProperty({
    description: 'new 여부',
    example: 'true',
    nullable: false,
  })
  isNewBadge: boolean;

  @ApiProperty({
    description: '챌린지 참여중인 인원 수',
    example: '3',
    nullable: false,
  })
  participantCount: number;

  @ApiProperty({
    description: '챌린지 참여자 목록',
    isArray: true,
    example: ParticipantUserDTO,
    type: ParticipantUserDTO,
  })
  participants: ParticipantUserDTO[];

  constructor(
    id: number,
    title: string,
    subTitle: string,
    mainImage: string,
    isHotBadge: boolean,
    isNewBadge: boolean,
    participantCount: number,
    participants: ParticipantUserDTO[],
  ) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.mainImage = mainImage;
    this.isHotBadge = isHotBadge;
    this.isNewBadge = isNewBadge;
    this.participantCount = participantCount;
    this.participants = participants;
  }
}

export class GetChallengeTitleReqDTO implements IChallengeTitle {
  @ApiProperty({description: '챌린지 id', example: '1'})
  id: number;

  @ApiProperty({description: '챌린지 이름', example: '챌린지'})
  title: string;
}

export class GetChallengeListReqQueryDTO {
  @ApiProperty({
    required: true,
    default: CHALLENGES_SORT.BRAND_NEW,
    enum: CHALLENGES_SORT,
    description: '챌린지 목록 정렬(default 최신순)',
    example: 'BRAND_NEW',
  })
  sort: CHALLENGES_SORT;
}
