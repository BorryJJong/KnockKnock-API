/// <reference types="multer" />
import { FeedService } from './feed.service';
import { CreateFeedDTO, UpdateFeedDTO, GetListFeedMainResDTO, GetListFeedMainReqDTO, GetListFeedReqQueryDTO, GetListFeedResDTO, InsBlogCommentDTO, GetFeedViewReqDTO, GetFeedViewResDTO, GetListFeedCommentReqDTO, GetListFeedCommentResDTO, DelBlogCommentReqDTO, DeleteFeedReqDTO } from './dto/feed.dto';
import { FeedCreateResponse, DeleteBlogCommentResponse, APIBaseResponse } from 'src/shared/response_entities/feed/temp.response';
import { FeedValidator } from 'src/api/feed/feed.validator';
import { IUser } from 'src/api/users/users.interface';
export declare class FeedController {
    private readonly feedService;
    private readonly feedValidator;
    constructor(feedService: FeedService, feedValidator: FeedValidator);
    getFeedsByChallengesFilter(query: GetListFeedMainReqDTO): Promise<GetListFeedMainResDTO>;
    getListFeed(query: GetListFeedReqQueryDTO, user: IUser): Promise<GetListFeedResDTO>;
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO, user: IUser): Promise<FeedCreateResponse>;
    getFeed(param: GetFeedViewReqDTO, user: IUser): Promise<APIBaseResponse<GetFeedViewResDTO>>;
    insertBlogComment(user: IUser, insBlogCommentDTO: InsBlogCommentDTO): Promise<FeedCreateResponse>;
    getListFeedComment(user: IUser, param: GetListFeedCommentReqDTO): Promise<APIBaseResponse<GetListFeedCommentResDTO[]>>;
    deleteBlogComment(user: IUser, param: DelBlogCommentReqDTO): Promise<DeleteBlogCommentResponse>;
    update(updateFeedDTO: UpdateFeedDTO, user: any): Promise<APIBaseResponse<boolean>>;
    delete(param: DeleteFeedReqDTO, user: IUser): Promise<APIBaseResponse<boolean>>;
}
