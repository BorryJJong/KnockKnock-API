import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("promotions", { schema: "knockknock" })
export class Promotions {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "아이디" })
  id: number;

  @Column("varchar", { name: "type", comment: "종류", length: 45 })
  type: string;
}
