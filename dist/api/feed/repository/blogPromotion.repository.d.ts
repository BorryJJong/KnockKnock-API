import { QueryRunner, Repository } from 'typeorm';
import { CreateBlogPromotionDTO, GetBlogPromotionDTO } from '../dto/feed.dto';
import { BlogPromotion } from 'src/entities/BlogPromotion';
export declare class BlogPromotionRepository extends Repository<BlogPromotion> {
    createBlogPromotion(createBlogPromotionDTO: CreateBlogPromotionDTO): BlogPromotion;
    saveBlogPromotion(queryRunner: QueryRunner | null, blogPromotion: BlogPromotion): Promise<BlogPromotion>;
    getBlogPromotionByPostId(id: number): Promise<GetBlogPromotionDTO[]>;
}
