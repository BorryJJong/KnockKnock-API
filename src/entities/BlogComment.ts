import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("blog_comment", { schema: "knockknock" })
export class BlogComment {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "아이디" })
  id: number;

  @Column("int", { name: "post_id", comment: "게시글 아이디" })
  postId: number;

  @Column("int", { name: "user_id", comment: "사용자 아이디" })
  userId: number;

  @Column("text", { name: "content", comment: "내용" })
  content: string;

  @Column("int", {
    name: "comment_id",
    nullable: true,
    comment: "리댓글 대상(?) 댓글 pk",
  })
  commentId: number | null;

  @Column("datetime", { name: "reg_date", comment: "등록 날짜" })
  regDate: Date;

  @Column("datetime", {
    name: "del_date",
    nullable: true,
    comment: "삭제 날짜",
  })
  delDate: Date | null;

  @Column("char", {
    name: "Is_deleted",
    nullable: true,
    comment: "삭제 여부",
    length: 1,
    default: () => "'N'",
  })
  isDeleted: string | null;
}
