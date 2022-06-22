import {Injectable} from '@nestjs/common';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';
import {CreateBlogPromotionDTO} from './dto/feed.dto';
import {BlogPromotion} from 'src/entities/BlogPromotion';

@Injectable()
@EntityRepository(BlogPromotion)
export class BlogPromotionRepository extends Repository<BlogPromotion> {
  createBlogPromotion(createBlogPromotionDTO: CreateBlogPromotionDTO): BlogPromotion {
    return this.create({...createBlogPromotionDTO});
  }

  async saveBlogPromotion(queryRunner: QueryRunner | null, blogPromotion: BlogPromotion): Promise<BlogPromotion> {
      if(queryRunner === null){
        return await this.save(blogPromotion);
      } else {
        return await queryRunner.manager.save(blogPromotion);
      }
  }
}
