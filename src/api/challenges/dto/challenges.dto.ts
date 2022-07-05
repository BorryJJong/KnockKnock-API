import {ApiProperty, PickType} from '@nestjs/swagger';
import {Column} from 'typeorm';
import {Challenges} from '../../../entities/Challenges';
import {IChallengeTitle} from '../challenges.interface';

export class CreateChallengeRequestDTO extends PickType(Challenges, [
  'title',
  'subTitle',
  'content',
] as const) {}

export class GetChallengeRequestDTO extends PickType(Challenges, [
  'id',
] as const) {}

export class GetChallengeResponseDTO extends PickType(Challenges, [
  'id',
  'title',
  'subTitle',
  'content',
  'regDate',
] as const) {}

export class GetChallengeListResponseDTO extends PickType(Challenges, [
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

export class GetChallengeTitleDTO implements IChallengeTitle {
  @ApiProperty({description: '챌린지 id', example: '1'})
  id: number;

  @ApiProperty({description: '챌린지 이름', example: '챌린지'})
  title: string;
}

export class GetChallengeDTO implements IChallengeTitle {
  @ApiProperty({description: '챌린지 id', example: '1'})
  id: number;

  @ApiProperty({description: '챌린지 이름', example: '챌린지'})
  title: string;
}
