/// <reference types="multer" />
import { BlogChallenges } from '../../../entities/BlogChallenges';
import { BlogPromotion } from '../../../entities/BlogPromotion';
import { BlogImage } from '../../../entities/BlogImage';
import { BlogPost } from '../../../entities/BlogPost';
import { BlogComment } from '../../../entities/BlogComment';
import { IGetBlogImagesByBlogPost } from '../interface/blogImage.interface';
import { PagenationReqDTO, PagenationResDTO } from '@shared/dto/pagenation.dto';
declare const CreateFeedDTO_base: import("@nestjs/common").Type<Omit<BlogPost, "id" | "delDate" | "regDate" | "hits" | "modDate" | "isDeleted">>;
export declare class CreateFeedDTO extends CreateFeedDTO_base {
    promotions: string;
    challenges: string;
    images: Express.Multer.File[];
}
declare const UpdateFeedDTO_base: import("@nestjs/common").Type<Partial<CreateFeedDTO>>;
export declare class UpdateFeedDTO extends UpdateFeedDTO_base {
}
declare const CreateBlogPostDTO_base: import("@nestjs/common").Type<Omit<BlogPost, "id" | "delDate" | "regDate" | "hits" | "modDate" | "isDeleted">>;
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
declare const UpdateFeedDto_base: import("@nestjs/common").Type<Partial<CreateFeedDTO>>;
export declare class UpdateFeedDto extends UpdateFeedDto_base {
}
export declare class GetListFeedMainReqDTO extends PagenationReqDTO {
    challengeId: number;
}
export declare class GetFeedMainResDTO {
    private id;
    private thumbnailUrl;
    private isImageMore;
    constructor(id: number, thumbnailUrl: string, isImageMore: boolean);
}
export declare class GetListFeedMainResDTO extends PagenationResDTO {
    feeds: GetFeedMainResDTO[];
}
export declare class GetListBlogImageByBlogPostResDTO {
    private postId;
    private fileUrl;
    constructor(id: number, fileUrl: string);
}
declare const InsBlogCommentDTO_base: import("@nestjs/common").Type<Omit<BlogComment, "id" | "delDate" | "regDate" | "isDeleted">>;
export declare class InsBlogCommentDTO extends InsBlogCommentDTO_base {
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
    private regDateToString;
    private scale;
    private blogImages;
    private blogLikeCount;
    private isLike;
    private blogCommentCount;
    constructor(id: number, userName: string, userImage: string, regDateToString: string, scale: string, blogLikeCount: string, isLike: boolean, blogCommentCount: string, blogImages: IGetBlogImagesByBlogPost[]);
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
    locationX?: string;
    locationY?: string;
    regDate: Date;
    userName: string;
    userImage: string;
    scale: string;
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
export {};
