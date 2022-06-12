import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('blog_challenges', {schema: 'knockknock'})
export class BlogChallenges {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'post_id',
    primary: true,
    comment: '게시글 아이디',
    nullable: false,
  })
  postId: number;

  @Column({
    name: 'challenge_id',
    primary: true,
    comment: '챌린지 아이디',
    nullable: false,
  })
  challengeId: number;
}
