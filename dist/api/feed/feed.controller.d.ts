/// <reference types="multer" />
import { FeedService } from './feed.service';
import { CreateFeedDTO, UpdateFeedDTO, GetListFeedMainResDTO, GetListFeedMainReqDTO, GetListFeedReqQueryDTO, GetListFeedResDTO, InsBlogCommentDTO, GetFeedViewReqDTO, GetListFeedCommentReqDTO, DelBlogCommentReqDTO, DeleteFeedReqDTO } from './dto/feed.dto';
import { FeedCreateResponse, GetFeedViewResponse, GetFeedCommentResponse, DeleteBlogCommentResponse, UpdateFeedResponse } from 'src/shared/response_entities/feed/temp.response';
import { FeedValidator } from 'src/api/feed/feed.validator';
export declare class FeedController {
    private readonly feedService;
    private readonly feedValidator;
    constructor(feedService: FeedService, feedValidator: FeedValidator);
    getFeedsByChallengesFilter(query: GetListFeedMainReqDTO): Promise<GetListFeedMainResDTO>;
    getListFeed(query: GetListFeedReqQueryDTO, req: any): Promise<GetListFeedResDTO>;
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO, req: any): Promise<FeedCreateResponse>;
    getFeed(param: GetFeedViewReqDTO, req: any): Promise<GetFeedViewResponse>;
    insertBlogComment(req: any, insBlogCommentDTO: InsBlogCommentDTO): Promise<FeedCreateResponse>;
    getListFeedComment(param: GetListFeedCommentReqDTO): Promise<GetFeedCommentResponse>;
    deleteBlogComment(req: any, param: DelBlogCommentReqDTO): Promise<DeleteBlogCommentResponse>;
    update(updateFeedDTO: UpdateFeedDTO, req: any): Promise<UpdateFeedResponse>;
    delete(param: DeleteFeedReqDTO, req: any): Promise<boolean>;
}
