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
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO): Promise<FeedCreateResponse>;
    getFeed(param: GetFeedViewReqDTO): Promise<GetFeedViewResponse>;
    insertBlogComment(insBlogCommentDTO: InsBlogCommentDTO): Promise<FeedCreateResponse>;
    getListFeedComment(param: GetListFeedCommentReqDTO): Promise<GetFeedCommentResponse>;
    deleteBlogComment(delBlogCommentReqDTO: DelBlogCommentReqDTO): Promise<DeleteBlogCommentResponse>;
    update(updateFeedDTO: UpdateFeedDTO): Promise<UpdateFeedResponse>;
    delete(param: DeleteFeedReqDTO, req: any): Promise<boolean>;
}
