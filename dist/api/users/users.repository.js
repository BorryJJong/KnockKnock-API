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
const typeorm_1 = require("typeorm");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async insertUser(request) {
        return await this.save(this.create(Object.assign({}, request)));
    }
    async updateUser(request) {
        await this.createQueryBuilder()
            .update(User_1.User)
            .set({
            nickname: request.nickname,
        })
            .where('id = :id', { id: request.id })
            .execute();
    }
    async selectSocialUser(socialUuid, socialType) {
        return await this.createQueryBuilder('users')
            .where('users.socialUuid = :socialUuid', { socialUuid })
            .andWhere('users.socialType = :socialType', { socialType })
            .getOne();
    }
    async findUserByEmail(email) {
        return await this.findOne({ email });
    }
    async findUserById(id) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.UnauthorizedException('존재하지 않는 유저입니다.');
        }
        return user;
    }
    async findUserByIdWithoutPassword(id) {
        const user = await this.findOne(id);
        return user;
    }
    async isExistSocialUser(socialUuid, socialType) {
        return await this.createQueryBuilder('users')
            .where('users.socialUuid = :socialUuid', { socialUuid })
            .andWhere('users.socialType = :socialType', { socialType })
            .getCount();
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(User_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=users.repository.js.map