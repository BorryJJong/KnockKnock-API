import {SOCIAL_TYPE} from '@shared/enums/enum';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
    name: 'social_uuid',
    type: 'varchar',
    nullable: false,
    comment: '소셜uuid',
    length: 255,
  })
  socialUuid: string;

  @Column({
    name: 'social_type',
    type: 'enum',
    nullable: false,
    comment: '소셜 종류',
    enum: SOCIAL_TYPE,
    default: SOCIAL_TYPE.KAKAO,
  })
  socialType: SOCIAL_TYPE;

  @Column({
    name: 'image',
    nullable: true,
    comment: '회원 프로필 이미지',
    type: 'text',
  })
  image: string;

  @Column({
    name: 'service_connection_date',
    nullable: true,
    comment: '서비스 접속 시간',
    type: 'timestamp',
  })
  serviceConnectionDate?: Date;

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

  @Column({
    name: 'refresh_token',
    nullable: true,
    comment: '리프래쉬 토큰',
    type: 'varchar',
    length: 255,
  })
  refreshToken?: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    precision: 0,
    nullable: true,
    comment: '회원탈퇴 날짜',
  })
  deletedAt: Date | null;
}
