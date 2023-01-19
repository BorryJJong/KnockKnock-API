"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToBlogPostHideRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const UserToBlogPostHide_1 = require("../../../entities/UserToBlogPostHide");
let UserToBlogPostHideRepository = class UserToBlogPostHideRepository extends typeorm_1.Repository {
    async insertUserToBlogPostHide(userId, postId, queryRunner) {
        await this.createQueryBuilder('userToBlogPostHide', queryRunner)
            .insert()
            .into(UserToBlogPostHide_1.UserToBlogPostHide)
            .values({
            userId,
            postId,
        })
            .execute();
    }
    async selectBlogPostHideByUser(userId, queryRunner) {
        return await this.createQueryBuilder('userToBlogPostHide', queryRunner)
            .where('userToBlogPostHide.userId = :userId', {
            userId,
        })
            .getMany();
    }
};
UserToBlogPostHideRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(UserToBlogPostHide_1.UserToBlogPostHide)
], UserToBlogPostHideRepository);
exports.UserToBlogPostHideRepository = UserToBlogPostHideRepository;
//# sourceMappingURL=UserToBlogPostHide.repository.js.map