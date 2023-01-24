import {ApiProperty} from '@nestjs/swagger';

export class GetPromotionResDTO {
  @ApiProperty({description: '프로모션 id', example: '1'})
  private id: number;

  @ApiProperty({
    description: '프로모션 종류',
    example: '다회용기 할인',
  })
  private type: string;

  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
  }
}
