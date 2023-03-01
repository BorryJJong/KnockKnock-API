import {ApiProperty} from '@nestjs/swagger';

export class GetListNoticeResDTO {
  @ApiProperty({
    description: '공지사항 ID',
    example: '1',
    nullable: false,
    required: true,
  })
  private id: number;

  @ApiProperty({
    description: '공지사항 제목',
    example: '시스템 점검 안내',
    nullable: false,
    required: true,
  })
  private title: string;

  @ApiProperty({
    description: '공지사항 수정일',
    example: 'yyyy.mm.dd(월) hh:mm',
    nullable: false,
    required: true,
  })
  private modDate: string;

  constructor(id: number, title: string, modDate: string) {
    this.id = id;
    this.title = title;
    this.modDate = modDate;
  }
}

export class GetNoticeResDTO {
  @ApiProperty({
    description: '공지사항 ID',
    example: '1',
    nullable: false,
    required: true,
  })
  private id: number;

  @ApiProperty({
    description: '공지사항 제목',
    example: '시스템 점검 안내',
    nullable: false,
    required: true,
  })
  private title: string;

  @ApiProperty({
    description: '공지사항 링크',
    example: 'https://github.com',
    nullable: false,
    required: true,
  })
  private link: string;

  constructor(id: number, title: string, link: string) {
    this.id = id;
    this.title = title;
    this.link = link;
  }
}

export class GetNoticeReqDTO {
  @ApiProperty({description: '공지사항ID', example: '1', required: true})
  id: number;
}
