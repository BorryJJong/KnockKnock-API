import {ApiProperty} from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/* 참고용
AddressFinder.Documents(
  placeName: "쉐보레 분당서비스센터 백현점",
  addressName: "경기 성남시 분당구 백현동 472-91",
  roadAddressName: "경기 성남시 분당구 대왕판교로 374",
  longtitude: "127.102269186127", 
  latitude: "37.3771012046504"),
*/
@Entity('blog_post', {schema: 'knockknock'})
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '사용자 id',
    example: '1',
  })
  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
    comment: '사용자 아이디',
  })
  userId: number;

  @ApiProperty({
    description: '내용',
    example:
      '패키지 상품을 받았을때의 기쁨 후엔 늘 골치아픈 쓰레기와 분리수거의 노동시간이 뒤따릅니다.',
  })
  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
    comment: '게시글 내용',
  })
  content: string;

  @ApiProperty({
    description: '매장 주소',
    example: '경기 성남시 분당구 대왕판교로 374',
    required: false,
    nullable: true,
  })
  @Column({
    name: 'store_address',
    type: 'varchar',
    length: 200,
    nullable: true,
    comment: '매장 주소',
  })
  storeAddress?: string;

  @ApiProperty({
    description: '매장명',
    example: '스타벅스 리버사이드팔당DTR점',
    required: false,
    nullable: true,
  })
  @Column({
    name: 'store_name',
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '매장 주소',
  })
  storeName?: string;

  @ApiProperty({
    description: '매장 주소 x좌표',
    example: '127.102269186127',
    required: false,
    nullable: true,
  })
  @Column({
    name: 'location_x',
    type: 'decimal',
    comment: 'x좌표',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  locationX?: string;

  @ApiProperty({
    description: '매장 주소 y좌표',
    example: '37.3771012046504',
    required: false,
    nullable: true,
  })
  @Column({
    name: 'location_y',
    type: 'decimal',
    comment: 'y좌표',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  locationY?: string;

  @ApiProperty({
    description: '게시글 내 이미지의 비율',
    example: '1:1',
  })
  @Column({
    name: 'scale',
    type: 'varchar',
    length: 30,
    nullable: false,
    comment: '게시글 내 이미지의 비율',
  })
  scale: string;

  @ApiProperty({
    description: '조회수',
    example: '73',
  })
  @Column({
    name: 'hits',
    type: 'int',
    comment: '조회수',
    default: 0,
    nullable: false,
  })
  hits: number;

  @Column({
    name: 'mod_date',
    type: 'timestamp',
    nullable: true,
    comment: '수정 날짜',
  })
  modDate?: Date;

  @ApiProperty({
    description: '숨기기 수',
    example: '5',
  })
  @Column({
    name: 'hide_count',
    type: 'int',
    comment: '숨기기 수',
    default: 0,
    nullable: false,
  })
  hideCount: number;

  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
    nullable: false,
    comment: '등록 날짜',
  })
  regDate: Date;

  @DeleteDateColumn({
    name: 'del_date',
    type: 'timestamp',
    precision: 0,
    comment: '삭제일',
    nullable: true,
  })
  delDate?: Date;

  @BeforeInsert()
  beforeInsert() {
    this.regDate = new Date();
  }
}
