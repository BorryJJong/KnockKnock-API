import {IEvent} from 'src/api/home/interface/event.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event', {schema: 'knockknock'})
export class Event implements IEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '이벤트 제목',
  })
  title: string;

  @Column({
    name: 'image',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '이벤트 이미지',
  })
  image: string;

  @Column({
    name: 'url',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '이벤트 홈페이지 URL',
  })
  url: string;

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '이벤트 등록일',
  })
  regDate: Date;

  @Column({
    name: 'start_date',
    nullable: false,
    comment: '시작 날짜',
    type: 'timestamp',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    nullable: true,
    comment: '종료 날짜',
    type: 'timestamp',
  })
  endDate?: Date;
}
