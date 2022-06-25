import {ApiProperty} from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('challenges', {schema: 'knockknock'})
export class Challenges {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    comment: '챌린지명',
    length: 20,
    nullable: false,
  })
  @ApiProperty({
    description: '챌린지명',
    example: '용기내챌린지',
    required: true,
  })
  title: string;

  @Column({
    name: 'sub_title',
    type: 'varchar',
    comment: '서브타이틀',
    length: 45,
    nullable: false,
  })
  @ApiProperty({
    description: '서브타이틀',
    example: '용기내챌린지',
    required: true,
  })
  subTitle: string;

  @Column({name: 'content', type: 'text', comment: '내용', nullable: false})
  @ApiProperty({
    description: '내용',
    example: '용기내챌린지 소개내용입니다',
    required: true,
  })
  content: string;

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    comment: '등록 날짜',
  })
  regDate: Date;

  @BeforeInsert()
  beforeInsert() {
    this.regDate = new Date();
  }
}
