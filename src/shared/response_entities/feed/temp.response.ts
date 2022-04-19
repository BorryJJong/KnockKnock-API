import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../base.response';

export abstract class FeedCreateResponseData {
  @ApiProperty()
  status: true | false;
}

export abstract class FeedCreateResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: FeedCreateResponseData;
}
