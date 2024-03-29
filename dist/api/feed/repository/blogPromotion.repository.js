"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPromotionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const BlogPromotion_1 = require("../../../entities/BlogPromotion");
const Promotions_1 = require("../../../entities/Promotions");
let BlogPromotionRepository = class BlogPromotionRepository extends typeorm_1.Repository {
    createBlogPromotion(createBlogPromotionDTO) {
        return this.create({ ...createBlogPromotionDTO });
    }
    async saveBlogPromotion(queryRunner, blogPromotion) {
        if (queryRunner === null) {
            return await this.save(blogPromotion);
        }
        else {
            return await queryRunner.manager.save(blogPromotion);
        }
    }
    async insertBlogPromotion(blogPromotions, queryRunner) {
        await this.createQueryBuilder('blogPromotion', queryRunner)
            .insert()
            .into(BlogPromotion_1.BlogPromotion)
            .values(blogPromotions)
            .execute();
    }
    async getBlogPromotionByPostId(id) {
        const promotions = await (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('bp.id', 'id')
            .addSelect('bp.promotion_id', 'promotionId')
            .addSelect('p.type', 'title')
            .from(BlogPromotion_1.BlogPromotion, 'bp')
            .innerJoin(Promotions_1.Promotions, 'p', 'bp.promotion_id = p.id')
            .where('bp.post_id = :id', { id: id })
            .getRawMany();
        return promotions;
    }
    async deleteBlogPromotionByPostId(queryRunner, postId) {
        if (queryRunner === null) {
            return await this.delete({ postId: postId });
        }
        else {
            return await queryRunner.manager.delete(BlogPromotion_1.BlogPromotion, { postId: postId });
        }
    }
};
BlogPromotionRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(BlogPromotion_1.BlogPromotion)
], BlogPromotionRepository);
exports.BlogPromotionRepository = BlogPromotionRepository;
//# sourceMappingURL=blogPromotion.repository.js.map