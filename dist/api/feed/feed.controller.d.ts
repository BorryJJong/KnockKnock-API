/// <reference types="multer" />
import { FeedService } from './feed.service';
import { CreateFeedDTO, UpdateFeedDTO, GetListFeedMainResDTO, GetListFeedMainReqDTO, GetListFeedReqQueryDTO, GetListFeedResDTO, InsBlogCommentDTO, GetFeedViewReqDTO, GetListFeedCommentReqDTO, DelBlogCommentReqDTO, DeleteFeedReqDTO } from './dto/feed.dto';
import { FeedCreateResponse, GetFeedViewResponse, GetFeedCommentResponse, DeleteBlogCommentResponse, UpdateFeedResponse } from 'src/shared/response_entities/feed/temp.response';
import { FeedValidator } from 'src/api/feed/feed.validator';
import { IUser } from 'src/api/users/users.interface';
export declare class FeedController {
    private readonly feedService;
    private readonly feedValidator;
    constructor(feedService: FeedService, feedValidator: FeedValidator);
    getFeedsByChallengesFilter(query: GetListFeedMainReqDTO): Promise<GetListFeedMainResDTO>;
    getListFeed(query: GetListFeedReqQueryDTO, user: IUser): Promise<GetListFeedResDTO>;
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO, user: IUser): Promise<FeedCreateResponse>;
    getFeed(param: GetFeedViewReqDTO, user: IUser): Promise<GetFeedViewResponse>;
    insertBlogComment(user: IUser, insBlogCommentDTO: InsBlogCommentDTO): Promise<FeedCreateResponse>;
    getListFeedComment(user: IUser, param: GetListFeedCommentReqDTO): Promise<GetFeedCommentResponse>;
    deleteBlogComment(user: IUser, param: DelBlogCommentReqDTO): Promise<DeleteBlogCommentResponse>;
    update(updateFeedDTO: UpdateFeedDTO, user: any): Promise<UpdateFeedResponse>;
    delete(param: DeleteFeedReqDTO, user: IUser): Promise<boolean>;
}
