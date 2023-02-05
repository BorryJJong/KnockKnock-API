/// <reference types="multer" />
import { FeedService } from './feed.service';
import { GetListFeedMainResDTO, GetListFeedMainReqDTO, GetListFeedReqQueryDTO, GetListFeedResDTO, InsBlogCommentDTO, GetFeedViewReqDTO, GetFeedViewResDTO, GetListFeedCommentReqDTO, GetListFeedCommentResDTO, DelBlogCommentReqDTO, DeleteFeedReqDTO, UpdateFeedReqDTO, UpdateFeedReqParamDTO, CreateFeedDTOV2, CreateFeedResDTO } from './dto/feed.dto';
import { ApiResponseDTO, NoneDataDTO, ErrorDTO } from '@shared/dto/response.dto';
import { FeedValidator } from 'src/api/feed/feed.validator';
import { IUser } from 'src/api/users/users.interface';
export declare class FeedController {
    private readonly feedService;
    private readonly feedValidator;
    constructor(feedService: FeedService, feedValidator: FeedValidator);
    getFeedsByChallengesFilter(query: GetListFeedMainReqDTO, user: IUser): Promise<ApiResponseDTO<GetListFeedMainResDTO | ErrorDTO>>;
    getListFeed(query: GetListFeedReqQueryDTO, user: IUser): Promise<ApiResponseDTO<GetListFeedResDTO | ErrorDTO>>;
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTOV2, user: IUser): Promise<ApiResponseDTO<CreateFeedResDTO | ErrorDTO>>;
    getFeed(param: GetFeedViewReqDTO, user: IUser): Promise<ApiResponseDTO<GetFeedViewResDTO | ErrorDTO>>;
    insertBlogComment(user: IUser, insBlogCommentDTO: InsBlogCommentDTO): Promise<ApiResponseDTO<void | ErrorDTO>>;
    getListFeedComment(user: IUser, param: GetListFeedCommentReqDTO): Promise<ApiResponseDTO<GetListFeedCommentResDTO[] | ErrorDTO>>;
    deleteBlogComment(user: IUser, param: DelBlogCommentReqDTO): Promise<ApiResponseDTO<void | ErrorDTO>>;
    update(param: UpdateFeedReqParamDTO, updateFeedDTO: UpdateFeedReqDTO, user: IUser): Promise<ApiResponseDTO<void | ErrorDTO>>;
    delete(param: DeleteFeedReqDTO, user: IUser): Promise<ApiResponseDTO<NoneDataDTO | ErrorDTO>>;
}
