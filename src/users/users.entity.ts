import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '유저 아이디',
    example: 1,
  })
  id: number;

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

  @CreateDateColumn()
  @ApiProperty({
    description: '생성일',
    example: '요건 아직 미정',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: '수정일',
    example: '요건 아직 미정',
  })
  updatedAt: Date;
}
