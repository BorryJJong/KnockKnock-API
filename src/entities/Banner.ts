import {BANNER_TARGET_SCREEN, BANNER_TYPE} from '@shared/enums/enum';
import {IBanner} from 'src/api/home/interface/banner.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('banner', {schema: 'knockknock'})
export class Banner implements IBanner {
  @PrimaryGeneratedColumn() id: number;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '배너 타입',
  })
  type: BANNER_TYPE;

  @Column({
    name: 'image',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '배너 이미지',
  })
  image: string;

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '배너 등록일',
  })
  regDate: Date;

  @Column({
    name: 'expose_date',
    nullable: false,
    comment: '노출 날짜',
    type: 'timestamp',
  })
  exposeDate: Date;

  @Column({
    name: 'expire_date',
    nullable: true,
    comment: '만료 날짜',
    type: 'timestamp',
  })
  expireDate?: Date;

  @Column({
    name: 'target_screen',
    nullable: true,
    type: 'enum',
    enum: BANNER_TARGET_SCREEN,
    comment: '이동 화면',
  })
  targetScreen?: BANNER_TARGET_SCREEN;
}
