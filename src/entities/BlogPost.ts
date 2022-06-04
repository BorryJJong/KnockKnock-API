import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
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
  @PrimaryGeneratedColumn({type: 'int', name: 'id', comment: '아이디'})
  id: number;

  @ApiProperty({
    description: '사용자 id',
    example: '1',
  })
  @Column('int', {name: 'user_id', comment: '사용자 아이디'})
  userId: number;

  @ApiProperty({
    description: '내용',
    example:
      '패키지 상품을 받았을때의 기쁨 후엔 늘 골치아픈 쓰레기와 분리수거의 노동시간이 뒤따릅니다.',
  })
  @Column('text', {name: 'content', comment: '내용'})
  content: string;

  @ApiProperty({
    description: '매장 주소',
    example: '경기 성남시 분당구 대왕판교로 374',
  })
  @Column('varchar', {
    name: 'store_address',
    comment: '매장 주소',
    length: 200,
  })
  storeAddress: string;

  @ApiProperty({
    description: '매장 주소 x좌표',
    example: '127.102269186127',
  })
  @Column('decimal', {
    name: 'location_x',
    comment: 'x좌표',
    precision: 10,
    scale: 7,
  })
  locationX: string;

  @ApiProperty({
    description: '매장 주소 y좌표',
    example: '37.3771012046504',
  })
  @Column('decimal', {
    name: 'location_y',
    comment: 'y좌표',
    precision: 10,
    scale: 7,
  })
  locationY: string;

  @ApiProperty({
    description: '조회수',
    example: '73',
  })
  @Column('int', {name: 'hits', comment: '조회수', default: 0})
  hits: number;

  @Column('timestamp', {
    name: 'mod_date',
    nullable: true,
    comment: '수정 날짜',
  })
  modDate: Date | null;

  @Column('datetime', {
    name: 'reg_date',
    comment: '등록 날짜',
    default: () => 'CURRENT_TIMESTAMP',
  })
  regDate: Date;

  @Column('datetime', {
    name: 'del_date',
    nullable: true,
    comment: '삭제 날짜',
  })
  delDate: Date | null;

  @Column('char', {
    name: 'Is_deleted',
    nullable: true,
    comment: '삭제 여부',
    length: 1,
    default: () => "'N'",
  })
  isDeleted: string | null;
}
