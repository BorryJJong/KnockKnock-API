import { GetFeedViewResDTO, GetListFeedCommentResDTO, GetListFeedLikeResDTO } from 'src/api/feed/dto/feed.dto';
import { BaseResponse } from '../base.response';
export declare abstract class FeedCreateResponseData {
    status: true | false;
}
export declare abstract class FeedCreateResponse extends BaseResponse {
    constructor();
    data: FeedCreateResponseData;
}
export declare abstract class GetFeedViewResponse extends BaseResponse {
    constructor();
    data: GetFeedViewResDTO;
}
export declare abstract class GetFeedCommentResponse extends BaseResponse {
    constructor();
    data: GetListFeedCommentResDTO[];
}
export declare abstract class GetListFeedLikeResponse extends BaseResponse {
    constructor();
    data: GetListFeedLikeResDTO;
}
