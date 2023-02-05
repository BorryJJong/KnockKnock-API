"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCommentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const BlogComment_1 = require("../../../entities/BlogComment");
const User_1 = require("../../../entities/User");
let BlogCommentRepository = class BlogCommentRepository extends typeorm_1.Repository {
    createBlogComment(insBlogCommentDTO, userId) {
        const { postId, commentId, content } = insBlogCommentDTO;
        return this.create({
            userId,
            postId,
            content,
            commentId,
        });
    }
    async saveBlogComment(queryRunner, BlogComment) {
        if (queryRunner === null) {
            return await this.save(BlogComment);
        }
        else {
            return await queryRunner.manager.save(BlogComment);
        }
    }
    async getBlogCommentByPostId(id) {
        const cntQb = (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('comment_id', 'reply_id')
            .addSelect('COUNT(*)', 'cnt')
            .from(BlogComment_1.BlogComment, 'b')
            .innerJoin(User_1.User, 'u', 'b.user_id = u.id')
            .where('b.comment_id IS NOT NULL')
            .andWhere('b.isDeleted = false')
            .groupBy('b.comment_id');
        const comment = await (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('bc.id', 'id')
            .addSelect('bc.user_id', 'userId')
            .addSelect('u.nickname', 'nickname')
            .addSelect('u.image', 'image')
            .addSelect('bc.is_deleted', 'isDeleted')
            .addSelect('IF( bc.is_deleted = 1, "삭제된 댓글입니다.", bc.content )', 'content')
            .addSelect('bc.reg_date', 'regDate')
            .addSelect('IFNULL(bcnt.cnt, 0)', 'replyCnt')
            .from(BlogComment_1.BlogComment, 'bc')
            .innerJoin(User_1.User, 'u', 'bc.user_id = u.id')
            .leftJoinAndSelect('(' + cntQb.getQuery() + ')', 'bcnt', 'bc.id = bcnt.reply_id')
            .where('(bcnt.cnt != 0 OR is_deleted = 0)')
            .andWhere('bc.comment_id IS NULL')
            .andWhere('bc.isDeleted = false')
            .andWhere('bc.post_id = :id', { id: id })
            .orderBy('bc.id', 'ASC')
            .getRawMany();
        return comment;
    }
    async getBlogCommentByCommentId(id) {
        const comment = await (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('bc.id', 'id')
            .addSelect('bc.user_id', 'userId')
            .addSelect('u.nickname', 'nickname')
            .addSelect('u.image', 'image')
            .addSelect('bc.is_deleted', 'isDeleted')
            .addSelect('bc.content', 'content')
            .addSelect('bc.reg_date', 'regDate')
            .from(BlogComment_1.BlogComment, 'bc')
            .innerJoin(User_1.User, 'u', 'bc.user_id = u.id')
            .where('bc.is_deleted = 0')
            .andWhere('bc.comment_id = :id', { id: id })
            .orderBy('bc.id', 'ASC')
            .getRawMany();
        return comment;
    }
    async getBlogComment(id) {
        return await this.findOneOrFail(id);
    }
    async selectFeedsByCommentCount(postIds) {
        return await this.createQueryBuilder('blogComment')
            .select('blogComment.postId', 'postId')
            .addSelect('count(*)', 'commentCount')
            .where('blogComment.postId IN (:...postIds)', {
            postIds: postIds.length === 0 ? [] : postIds,
        })
            .andWhere('blogComment.isDeleted = :isDeleted', {
            isDeleted: false,
        })
            .groupBy('blogComment.postId')
            .getRawMany();
    }
    async selectBlogPostCommentByUser(id, userId) {
        return await this.createQueryBuilder('blogComment')
            .where('blogComment.id = :id', {
            id,
        })
            .andWhere('blogComment.userId = :userId', {
            userId,
        })
            .getOne();
    }
};
BlogCommentRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(BlogComment_1.BlogComment)
], BlogCommentRepository);
exports.BlogCommentRepository = BlogCommentRepository;
//# sourceMappingURL=blogComment.repository.js.map