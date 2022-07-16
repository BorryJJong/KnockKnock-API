import { BaseResponse } from '../base.response';
export declare abstract class FeedCreateResponseData {
    status: true | false;
}
export declare abstract class FeedCreateResponse extends BaseResponse {
    constructor();
    data: FeedCreateResponseData;
}
