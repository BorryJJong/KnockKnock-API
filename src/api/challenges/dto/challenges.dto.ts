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
  @ApiProperty({description: '이미지', example: 'url'})
  image: string;

  @ApiProperty({description: '제목', example: '제목'})
  title: string;

  @ApiProperty({description: '부제목', example: '부제목'})
  subTitle: string;

  @ApiProperty({
    description: '방법',
    example: '[방법]',
    isArray: true,
    required: true,
  })
  rule: string[];

  @ApiProperty({
    description: '챌린지 서브 내용',
    example: '',
    type: [ChallengeContentDTO],
  })
  subContents: ChallengeSubContentDTO[];

  constructor(
    image: string,
    title: string,
    subTitle: string,
    rule: string[],
    subContents: ChallengeSubContentDTO[],
  ) {
    this.image = image;
    this.title = title;
    this.subTitle = subTitle;
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
  @ApiProperty({description: '챌린지 이름', example: '챌린지'})
  private readonly challenge: Challenges;

  @ApiProperty({
    description: '챌린지 참여자 목록',
    example: '[]',
    isArray: true,
    required: true,
    type: [ParticipantUserDTO],
  })
  private readonly participants: ParticipantUserDTO[];

  @ApiProperty({
    description: '챌린지 이름',
    example: '챌린지',
    type: ChallengeContentDTO,
  })
  private readonly content: ChallengeContentDTO;

  constructor(
    challenge: Challenges,
    participants: ParticipantUserDTO[],
    content: ChallengeContentDTO,
  ) {
    this.challenge = challenge;
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
] as const) {
  // 재구현 => refactoring
  // "newYn": "N",
  // "postCnt": "2",
  //  "rnk": "1",
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
