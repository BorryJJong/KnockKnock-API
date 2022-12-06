import {ApiProperty} from '@nestjs/swagger';
import {
  GetFeedViewResDTO,
  GetListFeedCommentResDTO,
  GetListFeedLikeResDTO,
} from 'src/api/feed/dto/feed.dto';
import {BaseResponse} from '../base.response';

export abstract class FeedResponseData {
  @ApiProperty()
  status: true | false;
}

export abstract class FeedCreateResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: FeedResponseData;
}

export abstract class GetFeedViewResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: GetFeedViewResDTO;
}

export abstract class GetFeedCommentResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({type: [GetListFeedCommentResDTO]})
  data: GetListFeedCommentResDTO[];
}

export abstract class GetListFeedLikeResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty({type: GetListFeedLikeResDTO})
  data: GetListFeedLikeResDTO;
}

export abstract class DeleteBlogCommentResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: FeedResponseData;
}

export abstract class UpdateFeedResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: FeedResponseData;
}