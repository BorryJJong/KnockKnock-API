import {ApiProperty} from '@nestjs/swagger';

export class PagenationRequestDTO {
  @ApiProperty({description: '현재 페이지', example: '0'})
  skip: number;

  @ApiProperty({description: '페이지에 보여질 개수', example: '10'})
  take: number;
}

export class PagenationResponseDTO {
  @ApiProperty({description: '다음 페이지 여부', example: 'true'})
  isNext: boolean;

  @ApiProperty({description: '데이터 총 개수', example: '10'})
  total: number;
}
