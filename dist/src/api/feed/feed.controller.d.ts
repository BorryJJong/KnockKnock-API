/// <reference types="multer" />
import { FeedService } from './feed.service';
import { CreateFeedDTO, UpdateFeedDTO, GetListFeedMainResDTO, GetListFeedMainReqDTO, GetListFeedReqQueryDTO, GetListFeedReqParamDTO, GetListFeedResDTO, GetFeedViewReqDTO } from './dto/feed.dto';
import { FeedCreateResponse, GetFeedViewResponse } from 'src/shared/response_entities/feed/temp.response';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    getFeedsByChallengesFilter(query: GetListFeedMainReqDTO): Promise<GetListFeedMainResDTO>;
    getListFeed(param: GetListFeedReqParamDTO, query: GetListFeedReqQueryDTO): Promise<GetListFeedResDTO>;
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO): Promise<FeedCreateResponse>;
    getFeed(param: GetFeedViewReqDTO): Promise<GetFeedViewResponse>;
    update(id: string, updateFeedDTO: UpdateFeedDTO): string;
    remove(id: string): string;
}
