import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

export abstract class BaseEnttiy {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  @ApiProperty({
    description: 'ID',
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  @ApiProperty({
    description: '생성일',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
  })
  @ApiProperty({
    description: '수정일',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    precision: 0,
  })
  @ApiProperty({
    description: '삭제일(soft)',
  })
  deletedAt?: Date;
}
