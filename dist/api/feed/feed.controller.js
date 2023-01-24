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
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const feed_service_1 = require("./feed.service");
const feed_dto_1 = require("./dto/feed.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const response_dto_1 = require("../../shared/dto/response.dto");
const jwtNoneRequired_guard_1 = require("../../auth/jwt/jwtNoneRequired.guard");
const feed_validator_1 = require("./feed.validator");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const user_decorator_1 = require("../../shared/decorator/user.decorator");
const enum_1 = require("../../shared/enums/enum");
const swagger_decorator_1 = require("../../shared/decorator/swagger.decorator");
let FeedController = class FeedController {
    constructor(feedService, feedValidator) {
        this.feedService = feedService;
        this.feedValidator = feedValidator;
    }
    async getFeedsByChallengesFilter(query, user) {
        try {
            const result = await this.feedService.getFeedsByChallengesFilter(query, user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, result);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getListFeed(query, user) {
        try {
            const feeds = await this.feedService.getListFeed(query, user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, feeds);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async create(files, createFeedDTO, user) {
        try {
            await this.feedValidator.checkPermissionCreateFeed(user.id);
            await this.feedService.create(files, createFeedDTO, user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getFeed(param, user) {
        try {
            const feed = await this.feedService.getFeed(param, user.id);
            return new response_dto_1.ApiResponseDTO(200, enum_1.API_RESPONSE_MEESAGE.SUCCESS, feed);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async insertBlogComment(user, insBlogCommentDTO) {
        try {
            await this.feedService.saveBlogComment(insBlogCommentDTO, user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getListFeedComment(user, param) {
        try {
            const comments = await this.feedService.getListFeedComment(param, user.id);
            return new response_dto_1.ApiResponseDTO(200, enum_1.API_RESPONSE_MEESAGE.SUCCESS, comments);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async deleteBlogComment(user, param) {
        try {
            await this.feedValidator.checkFeedCommentAuthor(param.id, user.id);
            await this.feedService.deleteBlogComment(param);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async update(updateFeedDTO, user) {
        try {
            await this.feedValidator.checkPermissionUpdateFeed(updateFeedDTO.id, user.id);
            await this.feedService.update(updateFeedDTO);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async delete(param, user) {
        try {
            await this.feedValidator.checkFeedAuthor(param.id, user.id);
            await this.feedService.delete(param);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
};
__decorate([
    (0, common_1.Get)('/main'),
    (0, swagger_1.ApiOperation)({
        summary: '피드 메인 API',
        externalDocs: {
            description: 'Figma링크',
            url: 'https://www.figma.com/file/1g4o56bPFBBzbGfpL29jo2/%23%EC%A0%9C%EB%A1%9C%EC%9B%A8%EC%9D%B4%EC%8A%A4%ED%8A%B8?node-id=1907%3A21526',
        },
        deprecated: false,
    }),
    (0, common_1.UseGuards)(jwtNoneRequired_guard_1.JwtOptionalGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_decorator_1.OkApiResponseDTO)(feed_dto_1.GetListFeedMainResDTO),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.GetListFeedMainReqDTO, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getFeedsByChallengesFilter", null);
__decorate([
    (0, common_1.Get)('/blog-post'),
    (0, common_1.UseGuards)(jwtNoneRequired_guard_1.JwtOptionalGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '피드 게시글 목록 API',
        externalDocs: {
            description: 'Figma링크',
            url: 'https://www.figma.com/file/1g4o56bPFBBzbGfpL29jo2/%23%EC%A0%9C%EB%A1%9C%EC%9B%A8%EC%9D%B4%EC%8A%A4%ED%8A%B8?node-id=1907%3A22097',
        },
        deprecated: false,
    }),
    (0, common_1.UseGuards)(jwtNoneRequired_guard_1.JwtOptionalGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_decorator_1.OkApiResponseDTO)(feed_dto_1.GetListFeedResDTO),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.GetListFeedReqQueryDTO, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getListFeed", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '피드 등록' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.ForbiddenApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, feed_dto_1.CreateFeedDTO, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwtNoneRequired_guard_1.JwtOptionalGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '피드 상세 조회' }),
    (0, swagger_decorator_1.OkApiResponseDTO)(feed_dto_1.GetFeedViewResDTO),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.GetFeedViewReqDTO, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getFeed", null);
__decorate([
    (0, common_1.Post)('/comment'),
    (0, swagger_1.ApiOperation)({ summary: '댓글 등록' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    __param(0, (0, user_decorator_1.UserDeco)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, feed_dto_1.InsBlogCommentDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "insertBlogComment", null);
__decorate([
    (0, common_1.Get)(':id/comment'),
    (0, common_1.UseGuards)(jwtNoneRequired_guard_1.JwtOptionalGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '댓글 목록 조회' }),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(feed_dto_1.GetListFeedCommentResDTO),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    __param(0, (0, user_decorator_1.UserDeco)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, feed_dto_1.GetListFeedCommentReqDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getListFeedComment", null);
__decorate([
    (0, common_1.Delete)('/comment/:id'),
    (0, swagger_1.ApiOperation)({ summary: '댓글 삭제' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.ForbiddenApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    __param(0, (0, user_decorator_1.UserDeco)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, feed_dto_1.DelBlogCommentReqDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "deleteBlogComment", null);
__decorate([
    (0, common_1.Post)('/update'),
    (0, swagger_1.ApiOperation)({ summary: '피드 수정' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.ForbiddenApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.UpdateFeedDTO, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '피드 삭제' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.ForbiddenApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.DeleteFeedReqDTO, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "delete", null);
FeedController = __decorate([
    (0, swagger_1.ApiTags)('feed'),
    (0, common_1.Controller)('feed'),
    __metadata("design:paramtypes", [feed_service_1.FeedService,
        feed_validator_1.FeedValidator])
], FeedController);
exports.FeedController = FeedController;
//# sourceMappingURL=feed.controller.js.map