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
let FeedController = class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
    }
    async getFeedsByChallengesFilter(query) {
        return this.feedService.getFeedsByChallengesFilter(query);
    }
    async getListFeed(param, query) {
        return this.feedService.getListFeed(param, query);
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
    update(id, updateFeedDTO) {
        return this.feedService.update(+id, updateFeedDTO);
    }
    remove(id) {
        return this.feedService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
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
        type: [feed_dto_1.GetListFeedMainResDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.GetListFeedMainReqDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getFeedsByChallengesFilter", null);
__decorate([
    (0, common_1.Get)(':feedId'),
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
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.GetListFeedReqParamDTO,
        feed_dto_1.GetListFeedReqQueryDTO]),
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
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, feed_dto_1.UpdateFeedDTO]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "remove", null);
FeedController = __decorate([
    (0, swagger_1.ApiTags)('feed'),
    (0, common_1.Controller)('feed'),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], FeedController);
exports.FeedController = FeedController;
//# sourceMappingURL=feed.controller.js.map