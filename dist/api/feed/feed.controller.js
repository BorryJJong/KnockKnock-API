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
const temp_response_1 = require("../../shared/response_entities/feed/temp.response");
const jwtNoneRequired_guard_1 = require("../../auth/jwt/jwtNoneRequired.guard");
const feed_validator_1 = require("./feed.validator");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
let FeedController = class FeedController {
    constructor(feedService, feedValidator) {
        this.feedService = feedService;
        this.feedValidator = feedValidator;
    }
    async getFeedsByChallengesFilter(query) {
        return this.feedService.getFeedsByChallengesFilter(query);
    }
    async getListFeed(query, req) {
        const requestUser = req.user;
        return this.feedService.getListFeed(query, requestUser.id);
    }
    async create(files, createFeedDTO) {
        const status = await this.feedService.create(files, createFeedDTO);
        const result = {
            code: status ? 201 : 500,
            message: status ? '성공' : '실패',
            data: {
                status: status,
            },
        };
        return result;
    }
    async getFeed(param) {
        const result = {
            code: 200,
            message: 'success',
            data: null,
        };
        try {
            const feed = await this.feedService.getFeed(param);
            result.data = feed;
        }
        catch (e) {
            result.code = 500;
            result.message = e.message;
        }
        return result;
    }
    async insertBlogComment(insBlogCommentDTO) {
        const result = {
            code: 201,
            message: 'success',
            data: {
                status: true,
            },
        };
        try {
            await this.feedService.saveBlogComment(insBlogCommentDTO);
        }
        catch (e) {
            result.code = 500;
            result.message = e.message;
            result.data.status = false;
        }
        return result;
    }
    async getListFeedComment(param) {
        const result = {
            code: 200,
            message: 'success',
            data: null,
        };
        try {
            const comments = await this.feedService.getListFeedComment(param);
            result.data = comments;
        }
        catch (e) {
            result.code = 500;
            result.message = e.message;
        }
        return result;
    }
    async deleteBlogComment(delBlogCommentReqDTO) {
        const result = {
            code: 200,
            message: 'success',
            data: {
                status: true,
            },
        };
        try {
            await this.feedService.deleteBlogComment(delBlogCommentReqDTO);
        }
        catch (e) {
            result.code = 500;
            result.message = e.message;
            result.data.status = false;
        }
        return result;
    }
    async update(updateFeedDTO) {
        const status = await this.feedService.update(updateFeedDTO);
        const result = {
            code: status ? 201 : 500,
            message: status ? '성공' : '실패',
            data: {
                status: status,
            },
        };
        return result;
    }
    async delete(param, req) {
        const requestUser = req.user;
        await this.feedValidator.checkFeedAuthor(param.id, requestUser.id);
        await this.feedService.delete(param);
        return true;
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
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공!!!',
        type: feed_dto_1.GetListFeedMainResDTO,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.GetListFeedMainReqDTO]),
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
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공!!!',
        type: [feed_dto_1.GetListFeedResDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.GetListFeedReqQueryDTO, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getListFeed", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '피드 등록' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '성공',
        type: temp_response_1.FeedCreateResponse,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, feed_dto_1.CreateFeedDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '피드 상세 조회' }),
    (0, swagger_1.ApiResponse)({
        description: '',
        type: temp_response_1.GetFeedViewResponse,
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.GetFeedViewReqDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getFeed", null);
__decorate([
    (0, common_1.Post)('/comment'),
    (0, swagger_1.ApiOperation)({ summary: '댓글 등록' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '성공',
        type: temp_response_1.FeedCreateResponse,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.InsBlogCommentDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "insertBlogComment", null);
__decorate([
    (0, common_1.Get)(':id/comment'),
    (0, swagger_1.ApiOperation)({ summary: '댓글 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        description: '성공',
        type: temp_response_1.GetFeedCommentResponse,
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.GetListFeedCommentReqDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getListFeedComment", null);
__decorate([
    (0, common_1.Delete)('/comment'),
    (0, swagger_1.ApiOperation)({ summary: '댓글 삭제' }),
    (0, swagger_1.ApiResponse)({
        description: '성공',
        type: temp_response_1.DeleteBlogCommentResponse,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.DelBlogCommentReqDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "deleteBlogComment", null);
__decorate([
    (0, common_1.Post)('/update'),
    (0, swagger_1.ApiOperation)({ summary: '피드 수정' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '성공',
        type: temp_response_1.UpdateFeedResponse,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.UpdateFeedDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '피드 삭제' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: '성공',
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
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