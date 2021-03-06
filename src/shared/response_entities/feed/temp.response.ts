import {ApiProperty} from '@nestjs/swagger';
import { GetFeedViewResDTO } from 'src/api/feed/dto/feed.dto';
import {BaseResponse} from '../base.response';

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

export abstract class GetFeedViewResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: GetFeedViewResDTO;
}