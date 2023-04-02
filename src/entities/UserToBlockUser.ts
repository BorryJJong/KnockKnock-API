import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user_to_block_user', {schema: 'knockknock'})
export class UserToBlockUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    primary: true,
    comment: '유저 아이디',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'block_user_id',
    primary: true,
    comment: '차단 유저 아이디',
    nullable: false,
  })
  blockUserId: number;
}
