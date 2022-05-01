import {
  Entity,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEnttiy } from '../shared/entities/base.entity';

@Entity('challenges')
export class Challenges extends BaseEnttiy {
  @Column({ 
    name: 'title',
    nullable: false,
  })
  @ApiProperty({
    description: '챌린지명',
    example: '용기내챌린지',
    required: true,
  })
  title: string;

  @Column({ 
    name:'sub_title',
    nullable: false,
  })
  @ApiProperty({
    description: '서브타이틀',
    example: '용기내챌린지',
    required: true,
  })
  subTitle: string;

  @Column({ 
    name:'content',
    nullable: false,
  })
  @ApiProperty({
    description: '내용',
    example: '용기내챌린지 소개내용입니다',
    required: true,
  })
  content: string;

  @Column({ 
    name:'reg_date',
    nullable: false,
  })
  @ApiProperty({
    description: '등록날짜',
    example: '20220206',
    required: true,
  })
  regDate: Date;
}
