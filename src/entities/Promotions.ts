import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('promotions', {schema: 'knockknock'})
export class Promotions {
  @ApiProperty({
    description: '프로모션 id',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '프로모션 종류',
    example: '다회용기 할인',
  })
  @Column({
    name: 'type',
    type: 'varchar',
    comment: '종류',
    length: 45,
    nullable: false,
  })
  type: string;
}
