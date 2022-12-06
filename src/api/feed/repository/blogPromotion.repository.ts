import {Injectable} from '@nestjs/common';
import {EntityRepository, getManager, QueryRunner, Repository} from 'typeorm';
import {CreateBlogPromotionDTO, GetBlogPromotionDTO} from '../dto/feed.dto';
import {BlogPromotion} from 'src/entities/BlogPromotion';
import { Promotions } from 'src/entities/Promotions';

@Injectable()
@EntityRepository(BlogPromotion)
export class BlogPromotionRepository extends Repository<BlogPromotion> {
  createBlogPromotion(
    createBlogPromotionDTO: CreateBlogPromotionDTO,
  ): BlogPromotion {
    return this.create({...createBlogPromotionDTO});
  }

  async saveBlogPromotion(
    queryRunner: QueryRunner | null,
    blogPromotion: BlogPromotion,
  ): Promise<BlogPromotion> {
    if (queryRunner === null) {
      return await this.save(blogPromotion);
    } else {
      return await queryRunner.manager.save(blogPromotion);
    }
  }

  async getBlogPromotionByPostId(id: number): Promise<GetBlogPromotionDTO[]> {
    const promotions: GetBlogPromotionDTO[] = await getManager()
      .createQueryBuilder()
      .select('bp.id', 'id')
      .addSelect('bp.promotion_id', 'promotionId')
      .addSelect('p.type', 'title')
      .from(BlogPromotion, 'bp')
      .innerJoin(Promotions, 'p', 'bp.promotion_id = p.id')
      .where('bp.post_id = :id', {id: id})
      .getRawMany();

    return promotions;
  }

  async deleteBlogPromotionByPostId(
    queryRunner: QueryRunner | null,
    postId: number,
  ) {
    if (queryRunner === null) {
      return await this.delete({postId: postId});
    } else {
      return await queryRunner.manager.delete(BlogPromotion, {postId: postId});
    }
  }
}
