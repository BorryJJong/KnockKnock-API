import {ApiProperty} from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blog_comment', {schema: 'knockknock'})
export class BlogComment {
  @ApiProperty({
    description: '댓글 id',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '게시글 id',
    example: 1,
  })
  @Column({
    name: 'post_id',
    type: 'int',
    comment: '게시글 id',
    nullable: false,
  })
  postId: number;

  @ApiProperty({
    description: '사용자 id',
    example: 1,
  })
  @Column({
    name: 'user_id',
    type: 'int',
    comment: '사용자 id',
    nullable: false,
  })
  userId: number;

  @ApiProperty({
    description: '내용',
    example: '용기낸 모습이 아름답습니다.',
  })
  @Column({
    name: 'content',
    type: 'text',
    comment: '내용',
    nullable: false,
  })
  content: string;

  @ApiProperty({
    description: '리댓글 대상 댓글 pk',
    example: 'null || 리댓글 대상 댓글 pk(int)',
  })
  @Column({
    name: 'comment_id',
    type: 'int',
    nullable: true,
    comment: 'null || 리댓글 대상 댓글 pk',
  })
  commentId: number | null;

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    comment: '생성 날짜',
  })
  regDate: Date;

  @Column({
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
