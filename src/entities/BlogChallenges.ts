import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BlogPost } from './BlogPost';
import { Challenges } from './Challenges';

@Entity('blog_challenges', { schema: 'knockknock' })
export class BlogChallenges {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'pk필수?' })
  id: number;

  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  BlogPost: BlogPost;

  @JoinColumn([{ name: 'challenges_id', referencedColumnName: 'id' }])
  Challenges: Challenges;

  // @Column('int', { name: 'post_id', comment: '게시글 아이디' })
  // postId: number;

  // @Column('int', { name: 'challenges_id', comment: '챌린지 아이디' })
  // challengesId: number;
}
