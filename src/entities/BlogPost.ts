import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("blog_post", { schema: "knockknock" })
export class BlogPost {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "아이디" })
  id: number;

  @Column("int", { name: "user_id", comment: "사용자 아이디" })
  userId: number;

  @Column("text", { name: "content", comment: "내용" })
  content: string;

  @Column("varchar", {
    name: "store_address",
    comment: "매장 주소",
    length: 200,
  })
  storeAddress: string;

  @Column("decimal", {
    name: "location_x",
    comment: "x좌표",
    precision: 10,
    scale: 7,
  })
  locationX: string;

  @Column("decimal", {
    name: "location_y",
    comment: "y좌표",
    precision: 10,
    scale: 7,
  })
  locationY: string;

  @Column("int", { name: "hits", comment: "조회수" })
  hits: number;

  @Column("timestamp", {
    name: "mod_date",
    nullable: true,
    comment: "수정 날짜",
  })
  modDate: Date | null;

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
