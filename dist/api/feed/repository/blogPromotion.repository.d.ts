import { QueryRunner, Repository } from 'typeorm';
import { CreateBlogPromotionDTO, GetBlogPromotionDTO } from '../dto/feed.dto';
import { BlogPromotion } from 'src/entities/BlogPromotion';
import { IBlogPromotion } from 'src/api/feed/interface/blogPromotion.interface';
export declare class BlogPromotionRepository extends Repository<BlogPromotion> {
    createBlogPromotion(createBlogPromotionDTO: CreateBlogPromotionDTO): BlogPromotion;
    saveBlogPromotion(queryRunner: QueryRunner | null, blogPromotion: BlogPromotion): Promise<BlogPromotion>;
    insertBlogPromotion(blogPromotions: IBlogPromotion[], queryRunner?: QueryRunner): Promise<void>;
    getBlogPromotionByPostId(id: number): Promise<GetBlogPromotionDTO[]>;
    deleteBlogPromotionByPostId(queryRunner: QueryRunner | null, postId: number): Promise<import("typeorm").DeleteResult>;
}
