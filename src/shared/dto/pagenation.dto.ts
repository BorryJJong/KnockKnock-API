import {ApiProperty} from '@nestjs/swagger';

export class PagenationReqDTO {
  @ApiProperty({
    description: '현재 페이지의 번호(기본 시작값 1부터)',
    example: '1',
  })
  page: number;

  @ApiProperty({description: '페이지에 호출될 데이터 개수', example: '10'})
  take: number;
}

export class PagenationResDTO {
  @ApiProperty({description: '다음 페이지 여부', example: 'true'})
  isNext: boolean;

  @ApiProperty({description: '데이터 총 개수', example: '10'})
  total: number;
}
