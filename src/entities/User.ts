import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'knockknock' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'pk' })
  id: number;

  @Column('varchar', { name: 'nickname', comment: '닉네임', length: 45 })
  nickname: string;

  @Column('int', { name: 'provider_id', comment: '제공자' })
  providerId: number;

  @Column('varchar', {
    name: 'access_token',
    nullable: true,
    comment: '접근 토큰',
    length: 255,
  })
  accessToken: string | null;

  @Column('datetime', {
    name: 'reg_date',
    comment: '등록 날짜',
    default: () => 'CURRENT_TIMESTAMP',
  })
  regDate: Date;
}
