"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const kakao_service_1 = require("../../auth/kakao.service");
const typeorm_2 = require("typeorm");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(userRepository, kakaoService, connection) {
        this.userRepository = userRepository;
        this.kakaoService = kakaoService;
        this.connection = connection;
    }
    async saveUser(request) {
        return await this.userRepository.insertUser(request);
    }
    async updateUser(request) {
        return await this.userRepository.updateUser(request);
    }
    async getSocialUser({ socialUuid, socialType, }) {
        return await this.userRepository.selectSocialUser(socialUuid, socialType);
    }
    async getUser(userId) {
        return await this.userRepository.selectUser(userId);
    }
    async logout(userId) {
        await this.userRepository.updateRefreshToken(userId, null);
    }
    async deleteUser(userId, socialUuid) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.kakaoService.unlink(socialUuid);
            await this.userRepository.updateUserDeletedAt(userId, queryRunner);
            await this.userRepository.updateRefreshToken(userId, null, queryRunner);
            await this.userRepository.deleteUserInfo(userId, queryRunner);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException({
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        finally {
            if (!queryRunner.isReleased) {
                await queryRunner.release();
            }
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_repository_1.UserRepository)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository,
        kakao_service_1.KakaoService,
        typeorm_2.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map