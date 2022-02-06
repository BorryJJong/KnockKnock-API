import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BaseEnttiy {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'ID',
  })
  id: number;

  @CreateDateColumn()
  @ApiProperty({
    description: '생성일',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: '수정일',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({
    description: '삭제일(soft)',
  })
  deletedAt: Date;
}
