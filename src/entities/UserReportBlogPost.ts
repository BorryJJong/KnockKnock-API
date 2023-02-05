import {REPORT_TYPE} from '@shared/enums/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_report_blog_post', {schema: 'knockknock'})
export class UserReportBlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    primary: true,
    comment: '유저 아이디',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'post_id',
    primary: true,
    comment: '게시글 아이디',
    nullable: false,
  })
  postId: number;

  @Column({
    name: 'report_type',
    type: 'enum',
    enum: REPORT_TYPE,
    comment: '신고사유 타입',
    nullable: false,
  })
  reportType: REPORT_TYPE;

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '신고 시간',
  })
  regDate: Date;
}
