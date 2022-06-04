import {Entity, Column} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEnttiy} from '../shared/entities/base.entity';

@Entity('users')
export class User extends BaseEnttiy {
  @Column({
    name: 'email',
    nullable: false,
  })
  @ApiProperty({
    description: '유저 이메일',
    example: 'chl9741@naver.com',
    required: true,
  })
  email: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  @ApiProperty({
    description: '비밀번호',
    example: 'password',
    required: true,
  })
  password: string;

  @Column({
    name: 'nickName',
    nullable: false,
  })
  @ApiProperty({
    description: '닉네임 3-20',
    example: '용제리',
    required: true,
  })
  nickName: string;
}
