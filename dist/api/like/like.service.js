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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const feed_dto_1 = require("../feed/dto/feed.dto");
const like_repository_1 = require("./repository/like.repository");
let LikeService = class LikeService {
    constructor(blogLikeRepository) {
        this.blogLikeRepository = blogLikeRepository;
    }
    async feedLike(id, userId) {
        await this.blogLikeRepository.insertFeedLike(id, userId);
        return true;
    }
    async feedUnLike(id, userId) {
        await this.blogLikeRepository.deleteFeedLike(id, userId);
        return true;
    }
    async getListFeedLike(id) {
        try {
            const likes = await this.blogLikeRepository.getListFeedLike(id);
            const result = {
                postId: id,
                likes: (0, class_transformer_1.plainToInstance)(feed_dto_1.GetFeedLikeDTO, likes),
            };
            return result;
        }
        catch (error) {
            throw new common_1.HttpException({
                error: error.message,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_repository_1.BlogLikeRepository)),
    __metadata("design:paramtypes", [like_repository_1.BlogLikeRepository])
], LikeService);
exports.LikeService = LikeService;
//# sourceMappingURL=like.service.js.map