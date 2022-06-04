import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('blog_like', {schema: 'knockknock'})
export class BlogLike {
  @PrimaryGeneratedColumn({type: 'int', name: 'id', comment: 'pk필수?'})
  id: number;

  @Column('int', {name: 'post_id', comment: '게시글 아이디'})
  postId: number;

  @Column('int', {name: 'user_id', comment: '사용자 아이디'})
  userId: number;

  @Column('datetime', {name: 'reg_date', comment: '등록 날짜'})
  regDate: Date;
}
