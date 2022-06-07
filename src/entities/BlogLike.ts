import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('blog_like', {schema: 'knockknock'})
export class BlogLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'post_id',
    type: 'int',
    nullable: false,
    comment: '게시글 아이디',
  })
  postId: number;

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
    comment: '사용자 아이디',
  })
  userId: number;

  @Column({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    comment: '좋아요 누른 날짜',
  })
  regDate: Date;

  @BeforeInsert()
  beforeInsert() {
    this.regDate = new Date();
  }
}
