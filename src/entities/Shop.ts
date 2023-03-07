import {stringIdsToArrayTransformer} from '@shared/utils';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface IShop {
  id: number;
  name: string;
  description: string;
  image: string;
  url: string;
  promotionIds: number[];
  regDate: Date;
  delDate?: Date;
  verifiedDate: Date;
  locationX: string;
  locationY: string;
}

@Entity('shop', {schema: 'knockknock'})
export class Shop implements IShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '상점명',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '상점 설명',
  })
  description: string;

  @Column({
    name: 'image',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '상점 이미지',
  })
  image: string;

  @Column({
    name: 'url',
    type: 'text',
    nullable: false,
    comment: '인증된 상점 홈페이지 URL or 주소',
  })
  url: string;

  @Column({
    name: 'promotion_ids',
    type: 'varchar',
    length: 30,
    nullable: false,
    comment: '프로모션 아이디',
    transformer: stringIdsToArrayTransformer,
  })
  promotionIds: number[];

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '등록 날짜',
  })
  regDate: Date;

  @DeleteDateColumn({
    name: 'del_date',
    type: 'timestamp',
    precision: 0,
    comment: '삭제 날짜',
    nullable: true,
  })
  delDate?: Date;

  @Column({
    name: 'verified_date',
    nullable: false,
    comment: '인증 날짜',
    type: 'timestamp',
  })
  verifiedDate: Date;

  @Column({
    name: 'location_x',
    type: 'decimal',
    comment: 'x좌표(경도)',
    precision: 10,
    scale: 7,
    nullable: false,
  })
  locationX: string;

  @Column({
    name: 'location_y',
    type: 'decimal',
    comment: 'y좌표(위도)',
    precision: 10,
    scale: 7,
    nullable: false,
  })
  locationY: string;
}
