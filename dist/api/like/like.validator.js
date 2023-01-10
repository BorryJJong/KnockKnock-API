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
exports.LikeValidator = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const like_repository_1 = require("./repository/like.repository");
let LikeValidator = class LikeValidator {
    constructor(likeRepository) {
        this.likeRepository = likeRepository;
    }
    async validLike(postId, userId, isLike) {
        const likeCount = await this.likeRepository.selectFeedByUser(postId, userId);
        const message = `이미 피드를 ${isLike ? '좋아' : '안좋아'}합니다`;
        if (isLike) {
            if (likeCount === 1)
                this.getHttpException(message);
        }
        else {
            if (likeCount === 0)
                this.getHttpException(message);
        }
    }
    getHttpException(message) {
        throw new common_1.HttpException({
            message,
        }, common_1.HttpStatus.CONFLICT);
    }
};
LikeValidator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_repository_1.BlogLikeRepository)),
    __metadata("design:paramtypes", [like_repository_1.BlogLikeRepository])
], LikeValidator);
exports.LikeValidator = LikeValidator;
//# sourceMappingURL=like.validator.js.map