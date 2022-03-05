import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog_promotion', { schema: 'knockknock' })
export class BlogPromotion {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'pk필수?' })
  id: number;

  @Column('int', { name: 'post_id', comment: '게시글 아이디' })
  postId: number;

  @Column('int', { name: 'promotion_id', comment: '프로모션 아이디' })
  promotionId: number;
}
