"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReportBlogPostRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const UserReportBlogPost_1 = require("../../../entities/UserReportBlogPost");
let UserReportBlogPostRepository = class UserReportBlogPostRepository extends typeorm_1.Repository {
    async insertUserReportBlogPost(userId, postId, reportType) {
        await this.createQueryBuilder('userReportBlogPost')
            .insert()
            .into(UserReportBlogPost_1.UserReportBlogPost)
            .values({
            userId,
            postId,
            reportType,
        })
            .execute();
    }
    async selectUserReportBlogPostByUser(userId, postId) {
        return await this.createQueryBuilder('userReportBlogPost')
            .select('userReportBlogPost.id', 'reportId')
            .where('userReportBlogPost.userId = :userId', {
            userId,
        })
            .andWhere('userReportBlogPost.postId = :postId ', {
            postId,
        })
            .getRawOne();
    }
};
UserReportBlogPostRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(UserReportBlogPost_1.UserReportBlogPost)
], UserReportBlogPostRepository);
exports.UserReportBlogPostRepository = UserReportBlogPostRepository;
//# sourceMappingURL=UserReportBlogPost.repository.js.map