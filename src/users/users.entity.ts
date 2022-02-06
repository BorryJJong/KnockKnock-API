import {
  Entity,
  Column,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEnttiy } from '../shared/entities/base.entity';

@Entity()
export class User extends BaseEnttiy {
  @Column({ nullable: false })
  @ApiProperty({
    description: '유저 이메일',
    example: 'cheol@toss.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ nullable: false })
  @ApiProperty({
    description: '비밀번호',
    example: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ nullable: false })
  @ApiProperty({
    description: '닉네임 3-20',
    example: '엘지엔솔따상가즈아',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  nickname: string;
}
