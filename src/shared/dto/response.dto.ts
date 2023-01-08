import {ApiProperty} from '@nestjs/swagger';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';

export class ApiResponseDTO<T = void> {
  @ApiProperty({
    description: 'Ground Rule(nestjs/common Http status)',
    example: '성공시 200',
  })
  private code: number;

  @ApiProperty({
    description: '응답에 대한 결과 메세지',
    example: 'SUCCESS or FAIL',
    enum: API_RESPONSE_MEESAGE,
  })
  private message: API_RESPONSE_MEESAGE;

  @ApiProperty({
    description: '응답값에 필요한 데이터',
    nullable: true,
  })
  private data?: T;

  constructor(code: number, message: API_RESPONSE_MEESAGE, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
