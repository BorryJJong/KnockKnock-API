import {ApiProperty} from '@nestjs/swagger';

export class ApiResponseDTO<T = void> {
  @ApiProperty({
    description: 'Ground Rule(nestjs/common Http status)',
    example: '성공시 200',
  })
  private code: number;

  @ApiProperty({
    description: '응답에 대한 결과 메세지',
    example: 'SUCCESS',
    type: String,
  })
  private message: string;

  @ApiProperty({
    description: '응답값에 필요한 데이터',
    nullable: true,
  })
  private data?: T;

  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export class ErrorDTO {
  @ApiProperty({
    description:
      '실패에 대한 Http Status Code || Ground Rule(nestjs/common Http status)',
    example: 'default(500) 혹은 설정된 다른 Status Code',
  })
  private code: number;

  @ApiProperty({
    description: '응답에 대한 결과 메세지',
    example: 'Error Message',
    type: String,
  })
  private message: string;
}

export class NoneDataDTO {
  @ApiProperty({
    description: 'Ground Rule(nestjs/common Http status)',
    example: '성공시 200',
  })
  private code: number;

  @ApiProperty({
    description: '응답에 대한 결과 메세지',
    example: 'SUCCESS',
    type: String,
  })
  private message: string;
}
