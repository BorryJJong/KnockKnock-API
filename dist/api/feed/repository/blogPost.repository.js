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
const BlogLike_1 = require("../../../entities/BlogLike");
const home_dto_1 = require("../../home/dto/home.dto");
const BlogImage_1 = require("../../../entities/BlogImage");
let BlogPostRepository = class BlogPostRepository extends typeorm_1.Repository {
    createBlogPost(createBlogPostDTO, userId) {
        return this.create(Object.assign(Object.assign({}, createBlogPostDTO), { userId }));
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
    async getBlogPostById(id, userId) {
        let queryBuilder = (0, typeorm_1.getManager)()
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
            .leftJoin(BlogLike_1.BlogLike, 'bl', 'bl.user_id = u.id')
            .where('bp.id = :id', { id: id });
        if (userId) {
            queryBuilder = queryBuilder.addSelect(sq => {
                return sq
                    .from(BlogLike_1.BlogLike, 'bl')
                    .select('IF(bl.id, true, false)')
                    .where('bl.userId = :userId', {
                    userId,
                })
                    .andWhere('bl.postId = :postId', {
                    postId: id,
                });
            }, 'isLike');
        }
        return await queryBuilder.getRawOne();
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
    async selectBlogPostByHotFeeds() {
        let queryBuilder = this.createQueryBuilder('blogPost')
            .select('blogPost.id', 'postId')
            .addSelect('blogPost.scale', 'scale')
            .addSelect('user.nickname', 'nickname')
            .addSelect('count(*)', 'blogLikeCount')
            .innerJoin(User_1.User, 'user', 'user.id = blogPost.id')
            .innerJoin(BlogImage_1.BlogImage, 'bi', 'bi.post_id = blogPost.id')
            .leftJoin(BlogLike_1.BlogLike, 'blogLike', 'blogLike.post_id = blogPost.id')
            .where('blogPost.delDate IS NULL')
            .orderBy('blogPost.hits', 'DESC')
            .addOrderBy('blogLikeCount', 'DESC')
            .addOrderBy('blogPost.regDate', 'DESC')
            .groupBy('blogPost.id')
            .addGroupBy('fileUrl');
        queryBuilder = queryBuilder.addSelect(sq => {
            return sq
                .select('bi.file_url')
                .from(BlogImage_1.BlogImage, 'bi')
                .where('bi.postId = blogPost.id')
                .limit(1);
        }, 'fileUrl');
        const hotFeeds = await queryBuilder.getRawMany();
        return hotFeeds.map(feed => {
            return new home_dto_1.GetListHotFeedResDTO(feed.postId, feed.scale, feed.nickname, feed.fileUrl);
        });
    }
};
BlogPostRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(BlogPost_1.BlogPost)
], BlogPostRepository);
exports.BlogPostRepository = BlogPostRepository;
//# sourceMappingURL=blogPost.repository.js.map