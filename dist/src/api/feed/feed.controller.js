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
const feed_dto_2 = require("./dto/feed.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const temp_response_1 = require("../../shared/response_entities/feed/temp.response");
let FeedController = class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
    }
    async create(files, body) {
        const status = await this.feedService.create(files, body);
        const result = {
            code: status ? 201 : 500,
            message: status ? '생성 성공' : '생성 실패',
            data: {
                status: status,
            },
        };
        return result;
    }
    findAll() {
        return this.feedService.findAll();
    }
    findOne(id) {
        return this.feedService.findOne(+id);
    }
    update(id, updateFeedDto) {
        return this.feedService.update(+id, updateFeedDto);
    }
    remove(id) {
        return this.feedService.remove(+id);
    }
};
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
    __metadata("design:paramtypes", [Array, feed_dto_1.CreateFeedDto]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, feed_dto_2.UpdateFeedDto]),
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