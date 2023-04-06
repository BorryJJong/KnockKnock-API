"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogLikeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const BlogLike_1 = require("../../../entities/BlogLike");
const User_1 = require("../../../entities/User");
let BlogLikeRepository = class BlogLikeRepository extends typeorm_1.Repository {
    async insertFeedLike(id, userId) {
        await this.manager.save(this.manager.create(BlogLike_1.BlogLike, {
            postId: id,
            userId,
        }));
        return true;
    }
    async deleteFeedLike(id, userId) {
        await this.manager.delete(BlogLike_1.BlogLike, { postId: id, userId });
        return true;
    }
    async getListFeedLike(postId, excludeUserIds) {
        let queryBuilder = await (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('bl.id', 'id')
            .addSelect('bl.user_id', 'userId')
            .addSelect('u.nickname', 'userName')
            .addSelect('u.image', 'userImage')
            .from(BlogLike_1.BlogLike, 'bl')
            .innerJoin(User_1.User, 'u', 'bl.user_id = u.id')
            .where('bl.post_id = :postId', { postId: postId });
        if (excludeUserIds.length > 0) {
            queryBuilder = queryBuilder.andWhere('bl.user_id NOT IN (:...excludeUserIds)', {
                excludeUserIds,
            });
        }
        return queryBuilder.getRawMany();
    }
    async selectFeedListByUserLikes(postIds, userId) {
        return await this.manager.find(BlogLike_1.BlogLike, {
            where: {
                postId: (0, typeorm_1.In)(postIds),
                userId,
            },
        });
    }
    async selectFeedsByLikeCount(postIds, excludeUserIds) {
        let queryBuilder = await this.createQueryBuilder('blogLike')
            .select('blogLike.postId', 'postId')
            .addSelect('count(*)', 'likeCount')
            .innerJoin(User_1.User, 'u', 'blogLike.user_id = u.id')
            .where('blogLike.postId IN (:...postIds)', {
            postIds,
        });
        if (excludeUserIds.length > 0) {
            queryBuilder = queryBuilder.andWhere('blogLike.userId NOT IN (:...excludeUserIds)', {
                excludeUserIds,
            });
        }
        return queryBuilder
            .groupBy('blogLike.postId')
            .getRawMany();
    }
    async selectFeedByUser(postId, userId) {
        return await this.createQueryBuilder('blogLike')
            .where('blogLike.postId = :postId', {
            postId,
        })
            .andWhere('blogLike.userId = :userId', {
            userId,
        })
            .getCount();
    }
};
BlogLikeRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(BlogLike_1.BlogLike)
], BlogLikeRepository);
exports.BlogLikeRepository = BlogLikeRepository;
//# sourceMappingURL=like.repository.js.map