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
exports.LikeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const temp_response_1 = require("../../shared/response_entities/feed/temp.response");
const like_service_1 = require("./like.service");
let LikeController = class LikeController {
    constructor(likeService, userService) {
        this.likeService = likeService;
        this.userService = userService;
    }
    async feedLike(id, req) {
        const requestUser = req.User;
        const user = await this.userService.getUser(requestUser.id);
        await this.likeService.feedLike(id, user.id);
        return true;
    }
    async feedUnLike(id, req) {
        const requestUser = req.User;
        const user = await this.userService.getUser(requestUser.id);
        await this.likeService.feedUnLike(id, user.id);
        return true;
    }
    async getListFeedLike(id) {
        const result = {
            code: 200,
            message: 'success',
            data: null,
        };
        try {
            const likes = await this.likeService.getListFeedLike(id);
            result.data = likes;
        }
        catch (e) {
            result.code = 500;
            result.message = e.message;
        }
        return result;
    }
};
__decorate([
    (0, common_1.Post)('/feed/:id'),
    (0, swagger_1.ApiOperation)({ summary: '피드 좋아요' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '성공',
        status: 200,
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "feedLike", null);
__decorate([
    (0, common_1.Delete)('/feed/:id'),
    (0, swagger_1.ApiOperation)({ summary: '피드 좋아요 취소' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '성공',
        status: 200,
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "feedUnLike", null);
__decorate([
    (0, common_1.Get)('/feed/:id'),
    (0, swagger_1.ApiOperation)({ summary: '피드 좋아요 목록' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '성공',
        type: temp_response_1.GetListFeedLikeResponse,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "getListFeedLike", null);
LikeController = __decorate([
    (0, swagger_1.ApiTags)('like'),
    (0, common_1.Controller)('like'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [like_service_1.LikeService,
        users_service_1.UsersService])
], LikeController);
exports.LikeController = LikeController;
//# sourceMappingURL=like.controller.js.map