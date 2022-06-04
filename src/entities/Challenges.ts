import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('challenges', {schema: 'knockknock'})
export class Challenges {
  @PrimaryGeneratedColumn({type: 'int', name: 'id', comment: '아이디'})
  id: number;

  @Column('varchar', {name: 'title', comment: '챌린지명', length: 20})
  title: string;

  @Column('varchar', {name: 'sub_title', comment: '서브타이틀', length: 45})
  subTitle: string;

  @Column('text', {name: 'content', comment: '내용'})
  content: string;

  @Column('datetime', {name: 'reg_date', comment: '등록 날짜'})
  regDate: Date;
}
