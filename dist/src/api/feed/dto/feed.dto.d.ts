/// <reference types="multer" />
import { BlogChallenges } from '../../../entities/BlogChallenges';
import { BlogPromotion } from '../../../entities/BlogPromotion';
import { BlogImage } from '../../../entities/BlogImage';
import { BlogPost } from '../../../entities/BlogPost';
import { PagenationReqDTO, PagenationResDTO } from '../../../shared/dto/Pagenation.dto';
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
export declare class GetListFeedReqDTO extends PagenationReqDTO {
    challengeId: number;
}
export declare class GetFeedResDTO {
    private id;
    private thumbnailUrl;
    private isImageMore;
    constructor(id: number, thumbnailUrl: string, isImageMore: boolean);
}
export declare class GetListFeedResDTO extends PagenationResDTO {
    feeds: GetFeedResDTO[];
}
export declare class GetListBlogImageByBlogPostResDTO {
    private postId;
    private fileUrl;
    constructor(id: number, fileUrl: string);
}
export {};
