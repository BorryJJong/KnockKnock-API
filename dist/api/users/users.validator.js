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
exports.UserValidator = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UserReportBlogPost_repository_1 = require("../feed/repository/UserReportBlogPost.repository");
const UserToBlockUser_repository_1 = require("./repository/UserToBlockUser.repository");
const users_repository_1 = require("./users.repository");
let UserValidator = class UserValidator {
    constructor(userRepository, userReportBlogPostRepository, userToBlockUserRepository) {
        this.userRepository = userRepository;
        this.userReportBlogPostRepository = userReportBlogPostRepository;
        this.userToBlockUserRepository = userToBlockUserRepository;
    }
    async checkExistSocialUser(socialUuid, socialType) {
        const user = await this.userRepository.isExistSocialUser(socialUuid, socialType);
        if (user) {
            throw new common_1.HttpException({
                message: '이미 존재하는 회원입니다',
            }, common_1.HttpStatus.CONFLICT);
        }
    }
    async checkDuplicateNickname(nickname) {
        const findNickname = await this.userRepository.selectUserNickname(nickname);
        if (findNickname) {
            throw new common_1.HttpException({
                message: `'${findNickname}' 닉네임은 중복입니다`,
            }, common_1.HttpStatus.CONFLICT);
        }
    }
    async alreadyReportBlogPost(userId, postId) {
        const reportId = await this.userReportBlogPostRepository.selectUserReportBlogPostByUser(userId, postId);
        if (reportId) {
            throw new common_1.HttpException({
                message: '이미 신고된 게시글입니다',
            }, common_1.HttpStatus.CONFLICT);
        }
    }
    async alreadyBlockUser(userId, blockUserid) {
        const blockId = await this.userToBlockUserRepository.selectBlockUser(userId, blockUserid);
        if (blockId) {
            throw new common_1.HttpException({
                message: '이미 차단된 유저입니다.',
            }, common_1.HttpStatus.CONFLICT);
        }
    }
};
UserValidator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_repository_1.UserRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(UserReportBlogPost_repository_1.UserReportBlogPostRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(UserToBlockUser_repository_1.UserToBlockUserRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserValidator);
exports.UserValidator = UserValidator;
//# sourceMappingURL=users.validator.js.map