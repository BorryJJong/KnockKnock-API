import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Challenges } from 'src/entities/Challenges';
import { Column } from 'typeorm';

export class CreateChallengeRequestDTO extends PickType(Challenges, [
  'title',
  'subTitle',
  'content',
] as const) {}

export class GetChallengeRequestDTO extends PickType(Challenges, ['id'] as const) {}

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
    name:'new_yn',
    nullable: true,
  })
  newYn: string;

  @Column({ 
    name:'post_cnt',
    nullable: true,
  })
  postCnt: number;

  @Column({ 
    name:'rnk',
    nullable: true,
  })
  rnk: number;
}

