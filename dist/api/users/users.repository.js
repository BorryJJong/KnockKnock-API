"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../../entities/User");
const common_1 = require("@nestjs/common");
const enum_1 = require("../../shared/enums/enum");
const typeorm_1 = require("typeorm");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async insertUser(request, fileUrl) {
        return await this.save(this.create({
            ...request,
            image: fileUrl,
        }));
    }
    async updateUser(userId, nickname, fileUrl) {
        await this.createQueryBuilder()
            .update(User_1.User)
            .set({
            nickname,
            image: fileUrl,
        })
            .where('id = :id', { id: userId })
            .execute();
    }
    async selectSocialUser(socialUuid, socialType) {
        return await this.createQueryBuilder('users')
            .where('users.socialUuid = :socialUuid', { socialUuid })
            .andWhere('users.socialType = :socialType', { socialType })
            .getOne();
    }
    async isExistSocialUser(socialUuid, socialType) {
        return await this.createQueryBuilder('users')
            .where('users.socialUuid = :socialUuid', { socialUuid })
            .andWhere('users.socialType = :socialType', { socialType })
            .getCount();
    }
    async updateRefreshToken(userId, refreshToken, queryRunner) {
        await this.createQueryBuilder('users', queryRunner)
            .update()
            .set({ refreshToken })
            .where('id = :id', { id: userId })
            .execute();
    }
    async selectUser(userId) {
        return await this.findOne(userId);
    }
    async selectUserFindOneOrFail(userId) {
        return await this.findOneOrFail(userId);
    }
    async selectUsers(userIds) {
        return await this.findByIds(userIds, {
            withDeleted: true,
        });
    }
    async updateUserDeletedAt(userId, queryRunner) {
        await this.createQueryBuilder('users', queryRunner)
            .where('users.id = :id', {
            id: userId,
        })
            .softDelete();
    }
    async deleteUserInfo(userId, queryRunner) {
        await this.createQueryBuilder('users', queryRunner)
            .update()
            .set({
            nickname: '',
            socialUuid: '',
            socialType: enum_1.SOCIAL_TYPE.NONE,
        })
            .where('id = :id', { id: userId })
            .execute();
    }
    async selectUserNickname(nickname) {
        return await this.findOne({
            where: {
                nickname,
            },
        }).then(user => user === null || user === void 0 ? void 0 : user.nickname);
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(User_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=users.repository.js.map