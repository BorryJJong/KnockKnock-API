import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('blog_challenges', {schema: 'knockknock'})
export class BlogChallenges {
  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number;

  @Column('int', {name: 'post_id', comment: '게시글 아이디'})
  postId: number;

  @Column('int', {name: 'challenge_id', comment: '챌린지 아이디'})
  challengeId: number;
}
