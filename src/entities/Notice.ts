import {INotice} from 'src/api/my-page/interface/notice.Interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notice', {schema: 'knockknock'})
export class Notice implements INotice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '공지사항 제목',
  })
  title: string;

  @Column({
    name: '링크',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '공지사항 링크',
  })
  link: string;

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '공지사항 등록일',
  })
  regDate: Date;

  @UpdateDateColumn({
    name: 'mod_date',
    type: 'timestamp',
    nullable: false,
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '공지사항 수정일',
  })
  modDate: Date;

  @Column({
    name: 'expose_date',
    nullable: false,
    comment: '노출 날짜',
    type: 'timestamp',
  })
  exposeDate: Date;
}
