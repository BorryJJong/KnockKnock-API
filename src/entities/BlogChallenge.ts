import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("blog_challenge", { schema: "knockknock" })
export class BlogChallenge {
  @PrimaryColumn({ type: "int", name: "post_id", comment: "피드 아이디" })
  postId: number;

  @PrimaryColumn({ type: "int", name: "challenge_id", comment: "챌린지 아이디" })
  challengeId: number;
}
