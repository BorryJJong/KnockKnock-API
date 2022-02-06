import { Column, Entity } from "typeorm";

@Entity("blog_promotion", { schema: "knockknock" })
export class BlogPromotion {
  @Column("int", { name: "post_id", comment: "게시글 아이디" })
  postId: number;

  @Column("int", { name: "promotion_id", comment: "프로모션 아이디" })
  promotionId: number;
}
