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
const blogPost_repository_1 = require("../feed/repository/blogPost.repository");
const UserReportBlogPost_repository_1 = require("../feed/repository/UserReportBlogPost.repository");
const UserToBlogPostHide_repository_1 = require("../feed/repository/UserToBlogPostHide.repository");
const image_service_1 = require("../image/image.service");
const kakao_service_1 = require("../../auth/kakao.service");
const typeorm_2 = require("typeorm");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(userRepository, blogPostRepository, userToBlogPostHideRepository, userReportBlogPostRepository, kakaoService, imageService, connection) {
        this.userRepository = userRepository;
        this.blogPostRepository = blogPostRepository;
        this.userToBlogPostHideRepository = userToBlogPostHideRepository;
        this.userReportBlogPostRepository = userReportBlogPostRepository;
        this.kakaoService = kakaoService;
        this.imageService = imageService;
        this.connection = connection;
    }
    async saveUser(request, file) {
        const fileUrl = await this.getUserProfileImageUrl(file);
        return await this.userRepository.insertUser(request, fileUrl);
    }
    async getSocialUser({ socialUuid, socialType, }) {
        return await this.userRepository.selectSocialUser(socialUuid, socialType);
    }
    async getUser(userId) {
        return await this.userRepository.selectUser(userId);
    }
    async getUserFindOrFail(userId) {
        return await this.userRepository.selectUserFindOneOrFail(userId);
    }
    async logout(userId) {
        await this.userRepository.updateRefreshToken(userId, undefined);
    }
    async deleteUser(userId, socialUuid, isKakao) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (isKakao) {
                await this.kakaoService.unlink(socialUuid);
            }
            await this.userRepository.updateUserDeletedAt(userId, queryRunner);
            await this.userRepository.updateRefreshToken(userId, undefined, queryRunner);
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
    async profileUpdate(userId, nickname, file) {
        let requestFileUrl;
        if (file) {
            requestFileUrl = await this.getUserProfileImageUrl(file);
        }
        return await this.userRepository.updateUser(userId, nickname, requestFileUrl);
    }
    async getUserProfileImageUrl(file) {
        let resultS3 = {
            ok: true,
            ETag: undefined,
            Key: undefined,
            url: undefined,
        };
        try {
            resultS3 = await this.imageService.uploadS3(file, 'user');
            if (!resultS3.ok) {
                throw new common_1.HttpException({
                    error: 'S3 image upload failed',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const fileUrl = resultS3.url || '';
            return fileUrl;
        }
        catch (e) {
            if (resultS3.ok) {
                this.imageService.deleteS3(resultS3.Key || '');
            }
            throw new common_1.HttpException({
                error: e.message,
                message: e.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkDuplicateNickname(nickname) {
        const findNickname = await this.userRepository.selectUserNickname(nickname);
        return findNickname ? true : false;
    }
    async hideBlogPost(userId, postId) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.userToBlogPostHideRepository.insertUserToBlogPostHide(userId, postId, queryRunner);
            await this.blogPostRepository.updateBlogPostHideCount(postId, queryRunner);
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
    async reportBlogPost(userId, postId, reportType) {
        await this.userReportBlogPostRepository.insertUserReportBlogPost(userId, postId, reportType);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_repository_1.UserRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(blogPost_repository_1.BlogPostRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(UserToBlogPostHide_repository_1.UserToBlogPostHideRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(UserReportBlogPost_repository_1.UserReportBlogPostRepository)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository, Object, UserToBlogPostHide_repository_1.UserToBlogPostHideRepository,
        UserReportBlogPost_repository_1.UserReportBlogPostRepository,
        kakao_service_1.KakaoService,
        image_service_1.ImageService,
        typeorm_2.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map