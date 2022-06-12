import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('blog_promotion', {schema: 'knockknock'})
export class BlogPromotion {
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
    name: 'promotion_id',
    type: 'int',
    comment: '프로모션 아이디',
    nullable: false,
  })
  promotionId: number;
}
