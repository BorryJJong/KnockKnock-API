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

  // @Column({
  //   name: 'provider_id',
  //   type: 'int',
  //   comment: '제공자',
  //   nullable: false,
  // })
  // providerId: number;

  @Column({
    name: 'social_uuid',
    type: 'varchar',
    nullable: false,
    comment: '소셜uuid',
    length: 255,
  })
  social_uuid: string;

  @Column({
    name: 'image',
    nullable: true,
    comment: '회원 프로필 이미지',
    type: 'text',
  })
  image: string;

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
