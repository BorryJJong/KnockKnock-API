import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user_to_blog_post_hide', {schema: 'knockknock'})
export class UserToBlogPostHide {
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
}
