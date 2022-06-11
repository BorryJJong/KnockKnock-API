import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blog_comment', {schema: 'knockknock'})
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'post_id',
    type: 'int',
    comment: '게시글 아이디',
    nullable: false,
  })
  postId: number;

  @Column({
    name: 'user_id',
    type: 'int',
    comment: '사용자 아이디',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'content',
    type: 'text',
    comment: '내용',
    nullable: false,
  })
  content: string;

  @Column({
    name: 'comment_id',
    type: 'int',
    nullable: true,
    comment: '리댓글 대상(?) 댓글 pk',
  })
  commentId: number | null;

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    comment: '생성 날짜',
  })
  regDate: Date;

  @DeleteDateColumn({
    name: 'del_date',
    type: 'timestamp',
    precision: 0,
    comment: '삭제일',
    nullable: true,
  })
  delDate?: Date;

  @Column({
    name: 'is_deleted',
    type: 'tinyint',
    default: false,
    comment: '삭제 여부',
  })
  isDeleted: boolean;

  @BeforeInsert()
  beforeInsert() {
    this.regDate = new Date();
  }
}
