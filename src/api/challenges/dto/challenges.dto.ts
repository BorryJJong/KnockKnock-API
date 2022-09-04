import {ApiProperty, PickType} from '@nestjs/swagger';
import {Column} from 'typeorm';
import {Challenges} from '../../../entities/Challenges';
import {IChallengeTitle} from '../challenges.interface';

export class insChallengeReqDTO extends PickType(Challenges, [
  'title',
  'subTitle',
  'content',
] as const) {}

export class GetChallengeRequestDTO {
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
  challenge : Challenges;
  participants: ParticipantUserDTO[]; 
  content : ChallengeContentDTO;
}

export class GetListChallengeResDTO extends PickType(Challenges, [
  'id',
  'title',
  'subTitle',
  'content',
  'regDate',
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

  participants: ParticipantUserDTO[];
}

export class ParticipantUserDTO {
  id: number;
  nickname: string;
  image: string;
}

export class ChallengeSubContentDTO {
  title: string;
  image: string;
  content: string;
}

export class ChallengeContentDTO {
  image: string;
  title: string;
  subTitle: string;
  rule: string[];
  subContents: ChallengeSubContentDTO[];
}

export class GetChallengeTitleReqDTO implements IChallengeTitle {
  @ApiProperty({description: '챌린지 id', example: '1'})
  id: number;

  @ApiProperty({description: '챌린지 이름', example: '챌린지'})
  title: string;
}
