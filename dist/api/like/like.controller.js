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
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const feed_dto_1 = require("../feed/dto/feed.dto");
const like_service_1 = require("./like.service");
const user_decorator_1 = require("../../shared/decorator/user.decorator");
const response_dto_1 = require("../../shared/dto/response.dto");
const enum_1 = require("../../shared/enums/enum");
const like_validator_1 = require("./like.validator");
const swagger_decorator_1 = require("../../shared/decorator/swagger.decorator");
const jwtNoneRequired_guard_1 = require("../../auth/jwt/jwtNoneRequired.guard");
let LikeController = class LikeController {
    constructor(likeService, likeValidator) {
        this.likeService = likeService;
        this.likeValidator = likeValidator;
    }
    async feedLike(id, user) {
        try {
            await this.likeValidator.validLike(id, user.id, true);
            await this.likeService.feedLike(id, user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async feedUnLike(id, user) {
        try {
            await this.likeValidator.validLike(id, user.id, false);
            await this.likeService.feedUnLike(id, user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getListFeedLike(user, id) {
        try {
            const likes = await this.likeService.getListFeedLike(id, user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, likes);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
};
__decorate([
    (0, common_1.Post)('/feed/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '피드 좋아요' }),
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.ConflictApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "feedLike", null);
__decorate([
    (0, common_1.Delete)('/feed/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '피드 좋아요 취소' }),
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.ConflictApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "feedUnLike", null);
__decorate([
    (0, common_1.Get)('/feed/:id'),
    (0, swagger_1.ApiOperation)({ summary: '피드 좋아요 목록' }),
    (0, common_1.UseGuards)(jwtNoneRequired_guard_1.JwtOptionalGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(feed_dto_1.GetListFeedLikeResDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, user_decorator_1.UserDeco)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "getListFeedLike", null);
LikeController = __decorate([
    (0, swagger_1.ApiTags)('like'),
    (0, common_1.Controller)('like'),
    __metadata("design:paramtypes", [like_service_1.LikeService,
        like_validator_1.LikeValidator])
], LikeController);
exports.LikeController = LikeController;
//# sourceMappingURL=like.controller.js.map