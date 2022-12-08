"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogChallengesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const BlogChallenges_1 = require("../../../entities/BlogChallenges");
const Challenges_1 = require("../../../entities/Challenges");
let BlogChallengesRepository = class BlogChallengesRepository extends typeorm_1.Repository {
    createBlogChallenges(createBlogChallengesDTO) {
        return this.create(Object.assign({}, createBlogChallengesDTO));
    }
    async saveBlogChallenges(queryRunner, blogChallenges) {
        if (queryRunner === null) {
            return await this.save(blogChallenges);
        }
        else {
            return await queryRunner.manager.save(blogChallenges);
        }
    }
    async getBlogChallengesByChallengeId(challengeId) {
        return this.createQueryBuilder('blogChallenges')
            .where('blogChallenges.challengeId = :challengeId ', { challengeId })
            .getMany();
    }
    async getBlogChallengesByPostId(id) {
        const challenges = await (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('bc.id', 'id')
            .addSelect('bc.challenge_id', 'challengeId')
            .addSelect('c.title', 'title')
            .from(BlogChallenges_1.BlogChallenges, 'bc')
            .innerJoin(Challenges_1.Challenges, 'c', 'bc.challenge_id = c.id')
            .where('bc.post_id = :id', { id: id })
            .getRawMany();
        return challenges;
    }
    async deleteBlogChallengesByPostId(queryRunner, postId) {
        if (queryRunner === null) {
            return await this.delete({ postId: postId });
        }
        else {
            return await queryRunner.manager.delete(BlogChallenges_1.BlogChallenges, { postId: postId });
        }
    }
};
BlogChallengesRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(BlogChallenges_1.BlogChallenges)
], BlogChallengesRepository);
exports.BlogChallengesRepository = BlogChallengesRepository;
//# sourceMappingURL=blogChallenges.repository.js.map