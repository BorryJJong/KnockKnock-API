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
const BlogPost_1 = require("../../../entities/BlogPost");
const typeorm_1 = require("typeorm");
const User_1 = require("../../../entities/User");
const utils_1 = require("../../../shared/utils");
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
    async updateBlogPost(queryRunner, postId, blogPost) {
        if (queryRunner === null) {
            return await this.update(postId, blogPost);
        }
        else {
            return await queryRunner.manager.update(BlogPost_1.BlogPost, postId, blogPost);
        }
    }
    async getBlogPosts(page, take, blogPostIds) {
        let queryBuilder = await this.createQueryBuilder('blogPost');
        if (blogPostIds.length > 0) {
            queryBuilder = queryBuilder.andWhereInIds(blogPostIds);
        }
        const [blogPosts, total] = await queryBuilder
            .skip((0, utils_1.getCurrentPageCount)(page, take))
            .take(take)
            .orderBy('blogPost.hits', 'DESC')
            .addOrderBy('blogPost.regDate', 'DESC')
            .getManyAndCount();
        return {
            items: blogPosts,
            pagination: {
                total,
                page,
                take,
            },
        };
    }
    async getListBlogPost(page, take, blogPostIds, excludeBlogPostId) {
        let queryBuilder = await this.createQueryBuilder('blogPost');
        if (excludeBlogPostId) {
            queryBuilder = queryBuilder.where('blogPost.id != :id', {
                id: excludeBlogPostId,
            });
        }
        if (blogPostIds.length > 0) {
            queryBuilder = queryBuilder.andWhereInIds(blogPostIds);
        }
        const limit = +page === 1 ? take - 1 : take;
        const [blogPosts, total] = await queryBuilder
            .orderBy('RAND()')
            .limit(limit)
            .getManyAndCount();
        return {
            items: blogPosts,
            pagination: {
                total: total + 1,
                page,
                take,
            },
        };
    }
    async getBlogPost(blogPostId) {
        return await this.createQueryBuilder('blogPost')
            .where('blogPost.id = :id', { id: blogPostId })
            .getOneOrFail();
    }
    async getBlogPostById(id) {
        const post = await (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('bp.id', 'id')
            .addSelect('bp.user_id', 'userId')
            .addSelect('bp.content', 'content')
            .addSelect('bp.store_address', 'storeAddress')
            .addSelect('bp.store_name', 'storeName')
            .addSelect('bp.location_x', 'locationX')
            .addSelect('bp.location_y', 'locationY')
            .addSelect('bp.reg_date', 'regDate')
            .addSelect('bp.scale', 'scale')
            .addSelect('u.nickname', 'userName')
            .addSelect('u.image', 'userImage')
            .from(BlogPost_1.BlogPost, 'bp')
            .innerJoin(User_1.User, 'u', 'bp.user_id = u.id')
            .where('bp.id = :id', { id: id })
            .getRawOne();
        return post;
    }
    async updateBlogPostHits(id) {
        await this.createQueryBuilder('blogPost')
            .update()
            .where('id = :id', { id })
            .set({ hits: () => '`hits` + 1' })
            .execute();
    }
    async deleteBlogPost(id, queryRunner) {
        await this.createQueryBuilder('blogPost', queryRunner)
            .where('id = :id', { id })
            .softDelete()
            .execute();
    }
    async selectBlogPostByUser(id, userId) {
        return this.createQueryBuilder('blogPost')
            .where('id = :id', { id })
            .andWhere('blogPost.userId = :userId', { userId })
            .getOne();
    }
};
BlogPostRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(BlogPost_1.BlogPost)
], BlogPostRepository);
exports.BlogPostRepository = BlogPostRepository;
//# sourceMappingURL=blogPost.repository.js.map