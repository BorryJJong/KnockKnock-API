import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export interface IPromotions {
  id: number;
  type: string;
}

@Entity('promotions', {schema: 'knockknock'})
export class Promotions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'type',
    type: 'varchar',
    comment: '종류',
    length: 45,
    nullable: false,
  })
  type: string;
}
