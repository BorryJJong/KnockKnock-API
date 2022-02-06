import {
  Entity,
  Column,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEnttiy } from '../shared/entities/base.entity';

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
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ 
    name:'password',
    nullable: false,
  })
  @ApiProperty({
    description: '비밀번호',
    example: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ 
    name:'nickName',
    nullable: false,
  })
  @ApiProperty({
    description: '닉네임 3-20',
    example: '용제리',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  nickName: string;
}
