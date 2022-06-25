/// <reference types="multer" />
import { BlogPost } from '../../../entities/BlogPost';
declare const CreateFeedDto_base: import("@nestjs/common").Type<Omit<BlogPost, "id" | "delDate" | "regDate" | "hits" | "modDate" | "isDeleted">>;
export declare class CreateFeedDto extends CreateFeedDto_base {
    promotions: string;
    challenges: string;
    images: Express.Multer.File[];
}
declare const UpdateFeedDto_base: import("@nestjs/common").Type<Partial<CreateFeedDto>>;
export declare class UpdateFeedDto extends UpdateFeedDto_base {
}
export {};
