import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("blog_image", { schema: "knockknock" })
export class BlogImage {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "id" })
  id: number;

  @Column("int", { name: "post_id", comment: "게시글 아이디" })
  postId: number;

  @Column("varchar", { name: "file_url", comment: "파일 경로", length: 255 })
  fileUrl: string;
}
