import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promotions', { schema: 'knockknock' })
export class Promotions {
  @ApiProperty({
    description: '프로모션 id',
    example: '1',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '아이디' })
  id: number;

  @ApiProperty({
    description: '프로모션 종류',
    example: '다회용기 할인',
  })
  @Column('varchar', { name: 'type', comment: '종류', length: 45 })
  type: string;
}
