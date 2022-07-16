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
let BlogPromotionRepository = class BlogPromotionRepository extends typeorm_1.Repository {
    createBlogPromotion(createBlogPromotionDTO) {
        return this.create(Object.assign({}, createBlogPromotionDTO));
    }
    async saveBlogPromotion(queryRunner, blogPromotion) {
        if (queryRunner === null) {
            return await this.save(blogPromotion);
        }
        else {
            return await queryRunner.manager.save(blogPromotion);
        }
    }
};
BlogPromotionRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(BlogPromotion_1.BlogPromotion)
], BlogPromotionRepository);
exports.BlogPromotionRepository = BlogPromotionRepository;
//# sourceMappingURL=blogPromotion.repository.js.map