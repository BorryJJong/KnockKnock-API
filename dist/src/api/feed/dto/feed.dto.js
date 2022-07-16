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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListBlogImageByBlogPostResDTO = exports.GetListFeedResDTO = exports.GetFeedResDTO = exports.GetListFeedReqDTO = exports.UpdateFeedDto = exports.CreateBlogImageDTO = exports.CreateBlogPromotionDTO = exports.CreateBlogChallengesDTO = exports.CreateBlogPostDTO = exports.UpdateFeedDTO = exports.CreateFeedDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const BlogChallenges_1 = require("../../../entities/BlogChallenges");
const BlogPromotion_1 = require("../../../entities/BlogPromotion");
const BlogImage_1 = require("../../../entities/BlogImage");
const BlogPost_1 = require("../../../entities/BlogPost");
const Pagenation_dto_1 = require("../../../shared/dto/Pagenation.dto");
class CreateFeedDTO extends (0, swagger_1.OmitType)(BlogPost_1.BlogPost, [
    'id',
    'hits',
    'modDate',
    'regDate',
    'delDate',
    'isDeleted',
]) {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: '프로모션 id', example: '1 or 1,2' }),
    __metadata("design:type", String)
], CreateFeedDTO.prototype, "promotions", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: '챌린지 id', example: '1 or 1,2,3' }),
    __metadata("design:type", String)
], CreateFeedDTO.prototype, "challenges", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이미지 binary data(multipart/form-data)' }),
    __metadata("design:type", Array)
], CreateFeedDTO.prototype, "images", void 0);
exports.CreateFeedDTO = CreateFeedDTO;
class UpdateFeedDTO extends (0, swagger_1.PartialType)(CreateFeedDTO) {
}
exports.UpdateFeedDTO = UpdateFeedDTO;
class CreateBlogPostDTO extends (0, swagger_1.OmitType)(BlogPost_1.BlogPost, [
    'id',
    'hits',
    'modDate',
    'regDate',
    'delDate',
    'isDeleted',
]) {
}
exports.CreateBlogPostDTO = CreateBlogPostDTO;
class CreateBlogChallengesDTO extends (0, swagger_1.OmitType)(BlogChallenges_1.BlogChallenges, ['id']) {
}
exports.CreateBlogChallengesDTO = CreateBlogChallengesDTO;
class CreateBlogPromotionDTO extends (0, swagger_1.OmitType)(BlogPromotion_1.BlogPromotion, ['id']) {
}
exports.CreateBlogPromotionDTO = CreateBlogPromotionDTO;
class CreateBlogImageDTO extends (0, swagger_1.OmitType)(BlogImage_1.BlogImage, ['id']) {
}
exports.CreateBlogImageDTO = CreateBlogImageDTO;
class UpdateFeedDto extends (0, swagger_1.PartialType)(CreateFeedDTO) {
}
exports.UpdateFeedDto = UpdateFeedDto;
class GetListFeedReqDTO extends Pagenation_dto_1.PagenationReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: '챌린지ID', example: '1' }),
    __metadata("design:type", Number)
], GetListFeedReqDTO.prototype, "challengeId", void 0);
exports.GetListFeedReqDTO = GetListFeedReqDTO;
class GetFeedResDTO {
    constructor(id, thumbnailUrl, isImageMore) {
        this.id = id;
        this.thumbnailUrl = thumbnailUrl;
        this.isImageMore = isImageMore;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '피드ID', example: '1' }),
    __metadata("design:type", Number)
], GetFeedResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '썸네일 이미지 url',
        example: '{aws.s3.endpoint}/feed/filename.png',
    }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이미지가 2장 이상일 경우 true', example: 'true' }),
    __metadata("design:type", Boolean)
], GetFeedResDTO.prototype, "isImageMore", void 0);
exports.GetFeedResDTO = GetFeedResDTO;
class GetListFeedResDTO extends Pagenation_dto_1.PagenationResDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '피드 목록',
        type: GetFeedResDTO,
        example: GetFeedResDTO,
    }),
    __metadata("design:type", Array)
], GetListFeedResDTO.prototype, "feeds", void 0);
exports.GetListFeedResDTO = GetListFeedResDTO;
class GetListBlogImageByBlogPostResDTO {
    constructor(id, fileUrl) {
        this.postId = id;
        this.fileUrl = fileUrl;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '피드ID', example: '1' }),
    __metadata("design:type", Number)
], GetListBlogImageByBlogPostResDTO.prototype, "postId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '블로그의 이미지 URL',
        example: '{aws.s3.endpoint}/feed/filename.png',
    }),
    __metadata("design:type", String)
], GetListBlogImageByBlogPostResDTO.prototype, "fileUrl", void 0);
exports.GetListBlogImageByBlogPostResDTO = GetListBlogImageByBlogPostResDTO;
//# sourceMappingURL=feed.dto.js.map