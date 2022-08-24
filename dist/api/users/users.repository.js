"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async checkExistEmail({ email }) {
        const user = await this.findOne({ select: ['email'], where: { email } });
        if (user) {
            throw new common_1.UnauthorizedException('이미 존재하는 이메일입니다.');
        }
    }
    async createUser(createUserRequestDTO) {
        const user = this.create(Object.assign({}, createUserRequestDTO));
        return await this.save(user);
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
        delete user.password;
        return user;
    }
    getUser(id) {
        return this.findOne(id);
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(users_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=users.repository.js.map