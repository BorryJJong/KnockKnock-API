/// <reference types="multer" />
import { FeedService } from './feed.service';
import { CreateFeedDTO, UpdateFeedDTO, GetListFeedMainResDTO, GetListFeedMainReqDTO, GetListFeedReqQueryDTO, GetListFeedResDTO, InsBlogCommentDTO, GetFeedViewReqDTO, GetListFeedCommentReqDTO } from './dto/feed.dto';
import { FeedCreateResponse, GetFeedViewResponse, GetFeedCommentResponse } from 'src/shared/response_entities/feed/temp.response';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    getFeedsByChallengesFilter(query: GetListFeedMainReqDTO): Promise<GetListFeedMainResDTO>;
    getListFeed(query: GetListFeedReqQueryDTO): Promise<GetListFeedResDTO>;
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO): Promise<FeedCreateResponse>;
    getFeed(param: GetFeedViewReqDTO): Promise<GetFeedViewResponse>;
    insertBlogComment(insBlogCommentDTO: InsBlogCommentDTO): Promise<FeedCreateResponse>;
    getListFeedComment(param: GetListFeedCommentReqDTO): Promise<GetFeedCommentResponse>;
    update(id: string, updateFeedDTO: UpdateFeedDTO): string;
    remove(id: string): string;
}
