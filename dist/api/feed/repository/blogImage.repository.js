"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogImageRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const BlogImage_1 = require("../../../entities/BlogImage");
let BlogImageRepository = class BlogImageRepository extends typeorm_1.Repository {
    createBlogImage(createBlogImageDTO) {
        return this.create({ ...createBlogImageDTO });
    }
    async saveBlogImage(queryRunner, blogImage) {
        if (queryRunner === null) {
            return await this.save(blogImage);
        }
        else {
            return await queryRunner.manager.save(blogImage);
        }
    }
    async getBlogImagesByBlogPost(blogPostIds) {
        if (blogPostIds.length === 0) {
            return [];
        }
        const blogImages = await this.createQueryBuilder('blogImage')
            .where('blogImage.postId IN (:...postIds)', {
            postIds: blogPostIds,
        })
            .getMany();
        return blogImages;
    }
    async getBlogImageByPostId(id) {
        const images = await this.find({
            select: ['id', 'fileUrl'],
            where: { postId: id },
        });
        return images;
    }
};
BlogImageRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(BlogImage_1.BlogImage)
], BlogImageRepository);
exports.BlogImageRepository = BlogImageRepository;
//# sourceMappingURL=blogImage.repository.js.map