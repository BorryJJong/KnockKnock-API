/// <reference types="multer" />
import { FeedService } from './feed.service';
import { CreateFeedDTO, UpdateFeedDTO, GetListFeedMainResDTO, GetListFeedMainReqDTO, GetListFeedReqQueryDTO, GetListFeedResDTO, InsBlogCommentDTO, GetFeedViewReqDTO, GetFeedViewResDTO, GetListFeedCommentReqDTO, GetListFeedCommentResDTO, DelBlogCommentReqDTO, DeleteFeedReqDTO } from './dto/feed.dto';
import { ApiResponseDTO } from '@shared/dto/response.dto';
import { FeedValidator } from 'src/api/feed/feed.validator';
import { IUser } from 'src/api/users/users.interface';
export declare class FeedController {
    private readonly feedService;
    private readonly feedValidator;
    constructor(feedService: FeedService, feedValidator: FeedValidator);
    getFeedsByChallengesFilter(query: GetListFeedMainReqDTO, user: IUser): Promise<ApiResponseDTO<GetListFeedMainResDTO>>;
    getListFeed(query: GetListFeedReqQueryDTO, user: IUser): Promise<ApiResponseDTO<GetListFeedResDTO>>;
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO, user: IUser): Promise<ApiResponseDTO<boolean>>;
    getFeed(param: GetFeedViewReqDTO, user: IUser): Promise<ApiResponseDTO<GetFeedViewResDTO>>;
    insertBlogComment(user: IUser, insBlogCommentDTO: InsBlogCommentDTO): Promise<ApiResponseDTO<any>>;
    getListFeedComment(user: IUser, param: GetListFeedCommentReqDTO): Promise<ApiResponseDTO<GetListFeedCommentResDTO[]>>;
    deleteBlogComment(user: IUser, param: DelBlogCommentReqDTO): Promise<ApiResponseDTO<boolean>>;
    update(updateFeedDTO: UpdateFeedDTO, user: IUser): Promise<ApiResponseDTO<boolean>>;
    delete(param: DeleteFeedReqDTO, user: IUser): Promise<ApiResponseDTO<boolean>>;
}
