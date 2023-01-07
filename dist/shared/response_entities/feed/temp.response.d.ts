import { API_RESPONSE_MEESAGE } from '@shared/enums/enum';
import { GetFeedViewResDTO, GetListFeedCommentResDTO, GetListFeedLikeResDTO } from 'src/api/feed/dto/feed.dto';
import { BaseResponse } from '../base.response';
export declare abstract class FeedResponseData {
    status: true | false;
}
export declare abstract class FeedCreateResponse extends BaseResponse {
    constructor();
    data: FeedResponseData;
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
export declare abstract class DeleteBlogCommentResponse extends BaseResponse {
    constructor();
    data: FeedResponseData;
}
export declare abstract class UpdateFeedResponse extends BaseResponse {
    constructor();
    data: FeedResponseData;
}
export declare class ErrorMessage {
    private data;
    constructor(data: string);
}
export declare class APIBaseResponse<T = void> {
    private code;
    private message;
    private data?;
    constructor(code: number, message: API_RESPONSE_MEESAGE, data?: T);
}
