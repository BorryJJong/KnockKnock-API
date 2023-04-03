"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToBlockUserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const UserToBlockUser_1 = require("../../../entities/UserToBlockUser");
let UserToBlockUserRepository = class UserToBlockUserRepository extends typeorm_1.Repository {
    async insertUserToBlockUser(userId, blockUserId, queryRunner) {
        await this.createQueryBuilder('userToBlockUser', queryRunner)
            .insert()
            .into(UserToBlockUser_1.UserToBlockUser)
            .values({
            userId,
            blockUserId,
        })
            .execute();
    }
    async selectBlockUser(userId, blockUserId, queryRunner) {
        return await this.createQueryBuilder('userToBlockUser', queryRunner)
            .where('userToBlockUser.userId = :userId', {
            userId,
        })
            .andWhere('userToBlockUser.blockUserId = :blockUserId', {
            blockUserId,
        })
            .getOne();
    }
    async selectBlockUserByUser(userIds, queryRunner) {
        if (userIds.length === 0) {
            return [];
        }
        return await this.createQueryBuilder('userToBlockUser', queryRunner)
            .where('userToBlockUser.userId IN (:...userIds)', {
            userIds,
        })
            .getMany();
    }
    async deleteUserToBlockUser(userId, blockUserId, queryRunner) {
        await this.createQueryBuilder('userToBlockUser', queryRunner)
            .delete()
            .where('userId = :userId', {
            userId,
        })
            .andWhere('blockUserId = :blockUserId', {
            blockUserId,
        })
            .execute();
    }
};
UserToBlockUserRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(UserToBlockUser_1.UserToBlockUser)
], UserToBlockUserRepository);
exports.UserToBlockUserRepository = UserToBlockUserRepository;
//# sourceMappingURL=UserToBlockUser.repository.js.map