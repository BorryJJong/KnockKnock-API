/// <reference types="multer" />
import { BlogChallenges } from '../../../entities/BlogChallenges';
import { BlogPromotion } from '../../../entities/BlogPromotion';
import { BlogImage } from '../../../entities/BlogImage';
import { BlogPost } from '../../../entities/BlogPost';
import { BlogComment } from '../../../entities/BlogComment';
import { PagenationReqDTO, PagenationResDTO } from '@shared/dto/pagenation.dto';
import { IGetBlogImagesByBlogPost } from '../interface/blogImage.interface';
import { REPORT_TYPE } from '@shared/enums/enum';
declare const CreateFeedDTO_base: import("@nestjs/common").Type<Omit<BlogPost, "id" | "regDate" | "hits" | "modDate" | "delDate">>;
export declare class CreateFeedDTO extends CreateFeedDTO_base {
    promotions: string;
    challenges: string;
    images: Express.Multer.File[];
}
export declare class CreateFeedDTOV2 {
    content: string;
    scale: string;
    storeAddress?: string;
    storeName?: string;
    locationX?: string;
    locationY?: string;
    promotions: string;
    challenges: string;
    images: Express.Multer.File[];
}
declare const UpdateFeedDTO_base: import("@nestjs/common").Type<Omit<BlogPost, "regDate" | "userId" | "hits" | "modDate" | "delDate">>;
export declare class UpdateFeedDTO extends UpdateFeedDTO_base {
    id: number;
    promotions: string;
    challenges: string;
}
export declare class UpdateFeedReqParamDTO {
    id: number;
}
export declare class UpdateFeedReqDTO {
    promotions: string;
    challenges: string;
    content: string;
    storeAddress?: string;
    storeName?: string;
    locationX?: string;
    locationY?: string;
}
declare const CreateBlogPostDTO_base: import("@nestjs/common").Type<Omit<BlogPost, "id" | "regDate" | "hits" | "modDate" | "delDate">>;
export declare class CreateBlogPostDTO extends CreateBlogPostDTO_base {
}
declare const CreateBlogChallengesDTO_base: import("@nestjs/common").Type<Omit<BlogChallenges, "id">>;
export declare class CreateBlogChallengesDTO extends CreateBlogChallengesDTO_base {
}
declare const CreateBlogPromotionDTO_base: import("@nestjs/common").Type<Omit<BlogPromotion, "id">>;
export declare class CreateBlogPromotionDTO extends CreateBlogPromotionDTO_base {
}
declare const CreateBlogImageDTO_base: import("@nestjs/common").Type<Omit<BlogImage, "id">>;
export declare class CreateBlogImageDTO extends CreateBlogImageDTO_base {
}
declare const UpdateBlogPostDTO_base: import("@nestjs/common").Type<Partial<Omit<CreateBlogPostDTO, "userId">>>;
export declare class UpdateBlogPostDTO extends UpdateBlogPostDTO_base {
}
export declare class GetListFeedMainReqDTO extends PagenationReqDTO {
    challengeId: number;
}
export declare class GetFeedMainResDTO {
    private id;
    private thumbnailUrl;
    private isImageMore;
    userId: number;
    constructor(id: number, thumbnailUrl: string, isImageMore: boolean, userId: number);
}
export declare class GetListFeedMainResDTO extends PagenationResDTO {
    feeds: GetFeedMainResDTO[];
}
export declare class GetListBlogImageByBlogPostResDTO {
    private postId;
    private fileUrl;
    constructor(id: number, fileUrl: string);
}
export declare class GetListFeedReqQueryDTO extends PagenationReqDTO {
    feedId: number;
    challengeId?: number;
}
export declare class GetFeedImageResDTO {
    private id;
    private fileUrl;
    constructor(id: number, fileUrl: string);
}
export declare class GetFeedResDTO {
    private id;
    private userName;
    private userImage;
    private content;
    private regDateToString;
    private scale;
    private blogImages;
    private blogLikeCount;
    private isLike;
    private blogCommentCount;
    private isWriter;
    private userId;
    constructor(id: number, userName: string, userImage: string, content: string, regDateToString: string, scale: string, blogLikeCount: string, isLike: boolean, blogCommentCount: string, blogImages: IGetBlogImagesByBlogPost[], isWriter: boolean, userId: number);
}
export declare class GetListFeedResDTO extends PagenationResDTO {
    feeds: GetFeedResDTO[];
}
export declare class GetFeedViewReqDTO {
    id: number;
}
export declare class GetBlogPostDTO {
    id: number;
    userId: number;
    content: string;
    storeAddress?: string;
    storeName?: string;
    locationX?: string;
    locationY?: string;
    regDate: Date;
    userName: string;
    userImage: string;
    scale: string;
    isLike: boolean;
    isWriter: boolean;
}
export declare class GetBlogPromotionDTO {
    id: number;
    promotionId: number;
    title: string;
}
export declare class GetBlogChallengesDTO {
    id: number;
    challengeId: number;
    title: string;
}
export declare class GetBlogImageDTO {
    id: number;
    fileUrl: string;
}
export declare class GetFeedViewResDTO {
    feed: GetBlogPostDTO;
    promotions: GetBlogPromotionDTO[];
    challenges: GetBlogChallengesDTO[];
    images: GetBlogImageDTO[];
}
declare const InsBlogCommentDTO_base: import("@nestjs/common").Type<Omit<BlogComment, "id" | "regDate" | "delDate">>;
export declare class InsBlogCommentDTO extends InsBlogCommentDTO_base {
}
export declare class DelBlogCommentReqDTO {
    id: number;
}
export declare class GetBlogCommentDTO {
    id: number;
    userId: number;
    nickname: string;
    image: string;
    content: string;
    regDate: Date;
    isDeleted: boolean;
    isWriter: boolean;
}
export declare class GetListFeedCommentResDTO extends GetBlogCommentDTO {
    replyCnt?: number;
    reply?: GetBlogCommentDTO[];
}
export declare class GetListFeedCommentReqDTO {
    id: number;
}
export declare class GetFeedLikeDTO {
    id: number;
    userId: number;
    userName: string;
    userImage: string;
}
export declare class GetListFeedLikeResDTO {
    postId: number;
    likes: GetFeedLikeDTO[];
}
export declare class DeleteFeedReqDTO {
    id: number;
}
export declare class PostFeedBlogPostHideReqDTO {
    id: number;
}
export declare class ReportBlogPostReqParamDTO {
    id: number;
}
export declare class ReportBlogPostReqBodyDTO {
    reportType: REPORT_TYPE;
}
export declare class CreateFeedResDTO {
    private id;
    constructor(id: number);
}
export {};
