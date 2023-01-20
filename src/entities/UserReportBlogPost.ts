import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
    name: 'contents',
    type: 'varchar',
    comment: '내용',
    length: 255,
    nullable: false,
  })
  contents: string;
}
