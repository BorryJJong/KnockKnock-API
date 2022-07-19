"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const BlogPost_1 = require("../../../entities/BlogPost");
let BlogPostRepository = class BlogPostRepository extends typeorm_1.Repository {
    createBlogPost(createBlogPostDTO) {
        return this.create(Object.assign({}, createBlogPostDTO));
    }
    async saveBlogPost(queryRunner, blogPost) {
        if (queryRunner === null) {
            return await this.save(blogPost);
        }
        else {
            return await queryRunner.manager.save(blogPost);
        }
    }
    async getBlogPosts(skip, take, blogPostIds) {
        const queryBuilder = await this.createQueryBuilder('blogPost');
        if (blogPostIds.length > 0) {
            queryBuilder.andWhereInIds(blogPostIds);
        }
        const [blogPosts, total] = await queryBuilder
            .skip(skip)
            .take(take)
            .orderBy('blogPost.regDate', 'ASC')
            .getManyAndCount();
        return {
            items: blogPosts,
            pagination: {
                total,
                skip,
                take,
            },
        };
    }
};
BlogPostRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(BlogPost_1.BlogPost)
], BlogPostRepository);
exports.BlogPostRepository = BlogPostRepository;
//# sourceMappingURL=blogPost.repository.js.map