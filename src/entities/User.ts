import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user', {schema: 'knockknock'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'nickname',
    type: 'varchar',
    comment: '닉네임',
    length: 45,
    nullable: false,
  })
  nickname: string;

  @Column({
    name: 'provider_id',
    type: 'int',
    comment: '제공자',
    nullable: false,
  })
  providerId: number;

  @Column({
    name: 'access_token',
    type: 'varchar',
    nullable: true,
    comment: '접근 토큰',
    length: 255,
  })
  accessToken: string | null;

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    comment: '등록 날짜',
  })
  regDate: Date;

  @BeforeInsert()
  beforeInsert() {
    this.regDate = new Date();
  }
}
