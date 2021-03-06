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
exports.GetFeedViewResDTO = exports.GetBlogImageDTO = exports.GetBlogChallengesDTO = exports.GetBlogPromotionDTO = exports.GetBlogPostDTO = exports.GetFeedViewReqDTO = exports.GetListFeedResDTO = exports.GetFeedResDTO = exports.GetFeedImageResDTO = exports.GetListFeedReqParamDTO = exports.GetListFeedReqQueryDTO = exports.GetListBlogImageByBlogPostResDTO = exports.GetListFeedMainResDTO = exports.GetFeedMainResDTO = exports.GetListFeedMainReqDTO = exports.UpdateFeedDto = exports.CreateBlogImageDTO = exports.CreateBlogPromotionDTO = exports.CreateBlogChallengesDTO = exports.CreateBlogPostDTO = exports.UpdateFeedDTO = exports.CreateFeedDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
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
    (0, swagger_1.ApiProperty)({ description: '???????????? id', example: '1 or 1,2' }),
    __metadata("design:type", String)
], CreateFeedDTO.prototype, "promotions", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: '????????? id', example: '1 or 1,2,3' }),
    __metadata("design:type", String)
], CreateFeedDTO.prototype, "challenges", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '????????? binary data(multipart/form-data)' }),
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
class GetListFeedMainReqDTO extends Pagenation_dto_1.PagenationReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: '?????????ID', example: '1' }),
    __metadata("design:type", Number)
], GetListFeedMainReqDTO.prototype, "challengeId", void 0);
exports.GetListFeedMainReqDTO = GetListFeedMainReqDTO;
class GetFeedMainResDTO {
    constructor(id, thumbnailUrl, isImageMore) {
        this.id = id;
        this.thumbnailUrl = thumbnailUrl;
        this.isImageMore = isImageMore;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '??????ID', example: '1' }),
    __metadata("design:type", Number)
], GetFeedMainResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '????????? ????????? url',
        example: '{aws.s3.endpoint}/feed/filename.png',
    }),
    __metadata("design:type", String)
], GetFeedMainResDTO.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '???????????? 2??? ????????? ?????? true', example: 'true' }),
    __metadata("design:type", Boolean)
], GetFeedMainResDTO.prototype, "isImageMore", void 0);
exports.GetFeedMainResDTO = GetFeedMainResDTO;
class GetListFeedMainResDTO extends Pagenation_dto_1.PagenationResDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '?????? ?????? ??????',
        type: GetFeedMainResDTO,
        example: GetFeedMainResDTO,
    }),
    __metadata("design:type", Array)
], GetListFeedMainResDTO.prototype, "feeds", void 0);
exports.GetListFeedMainResDTO = GetListFeedMainResDTO;
class GetListBlogImageByBlogPostResDTO {
    constructor(id, fileUrl) {
        this.postId = id;
        this.fileUrl = fileUrl;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '??????ID', example: '1' }),
    __metadata("design:type", Number)
], GetListBlogImageByBlogPostResDTO.prototype, "postId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '???????????? ????????? URL',
        example: '{aws.s3.endpoint}/feed/filename.png',
    }),
    __metadata("design:type", String)
], GetListBlogImageByBlogPostResDTO.prototype, "fileUrl", void 0);
exports.GetListBlogImageByBlogPostResDTO = GetListBlogImageByBlogPostResDTO;
class GetListFeedReqQueryDTO extends Pagenation_dto_1.PagenationReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '?????????ID', example: '1' }),
    __metadata("design:type", Number)
], GetListFeedReqQueryDTO.prototype, "challengeId", void 0);
exports.GetListFeedReqQueryDTO = GetListFeedReqQueryDTO;
class GetListFeedReqParamDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: '??????ID', example: '1' }),
    __metadata("design:type", Number)
], GetListFeedReqParamDTO.prototype, "feedId", void 0);
exports.GetListFeedReqParamDTO = GetListFeedReqParamDTO;
class GetFeedImageResDTO {
    constructor(id, fileUrl) {
        this.id = id;
        this.fileUrl = fileUrl;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '?????? ????????? id', example: '1' }),
    __metadata("design:type", Number)
], GetFeedImageResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '?????? ????????? url',
        example: '[{aws.s3.endpoint}/feed/filename.png]',
    }),
    __metadata("design:type", String)
], GetFeedImageResDTO.prototype, "fileUrl", void 0);
exports.GetFeedImageResDTO = GetFeedImageResDTO;
class GetFeedResDTO {
    constructor(id, userName, regDateToString, blogLikeCount, isLike, blogCommentCount, blogImages) {
        this.id = id;
        this.userName = userName;
        this.regDateToString = regDateToString;
        this.blogLikeCount = blogLikeCount;
        this.isLike = isLike;
        this.blogCommentCount = blogCommentCount;
        this.blogImages = blogImages.map(blogImage => new GetFeedImageResDTO(blogImage.id, blogImage.fileUrl));
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '??????ID', example: '1' }),
    __metadata("design:type", Number)
], GetFeedResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '????????? ?????????', example: 'sungmin_kim94' }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '?????? ??????(?????????)', example: '1?????????' }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "regDateToString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '?????? ????????? ??????',
        type: GetFeedImageResDTO,
        example: GetFeedImageResDTO,
    }),
    __metadata("design:type", Array)
], GetFeedResDTO.prototype, "blogImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '????????? ??????', example: '1,301' }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "blogLikeCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '????????? ?????? ??????', example: 'true' }),
    __metadata("design:type", Boolean)
], GetFeedResDTO.prototype, "isLike", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '?????? ??????', example: '2,456' }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "blogCommentCount", void 0);
exports.GetFeedResDTO = GetFeedResDTO;
class GetListFeedResDTO extends Pagenation_dto_1.PagenationResDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '?????? ????????? ??????',
        type: GetFeedResDTO,
        example: GetFeedResDTO,
    }),
    __metadata("design:type", Array)
], GetListFeedResDTO.prototype, "feeds", void 0);
exports.GetListFeedResDTO = GetListFeedResDTO;
class GetFeedViewReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '?????? id', example: '1' }),
    __metadata("design:type", Number)
], GetFeedViewReqDTO.prototype, "id", void 0);
exports.GetFeedViewReqDTO = GetFeedViewReqDTO;
let GetBlogPostDTO = class GetBlogPostDTO {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '????????? id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogPostDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '????????? id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogPostDTO.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '??????',
        example: '????????? ????????? ??????????????? ?????? ?????? ??? ???????????? ???????????? ??????????????? ??????????????? ???????????????.',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '?????? ??????',
        example: '?????? ????????? ????????? ??????????????? 374',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "storeAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '?????? ?????? x??????',
        example: '127.102269186127',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "locationX", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '?????? ?????? y??????',
        example: '37.3771012046504',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "locationY", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '?????? ??????',
        example: '?????? -> text ?????? ?????? ?????? ??????',
    }),
    __metadata("design:type", Date)
], GetBlogPostDTO.prototype, "regDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '????????? ?????????',
        example: '?????????',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "nickname", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '????????? ????????? ?????????',
        example: '{aws.s3.endpoint}/user/filename.png',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "image", void 0);
GetBlogPostDTO = __decorate([
    (0, class_transformer_1.Exclude)()
], GetBlogPostDTO);
exports.GetBlogPostDTO = GetBlogPostDTO;
let GetBlogPromotionDTO = class GetBlogPromotionDTO {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '????????? ???????????? id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogPromotionDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '???????????? id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogPromotionDTO.prototype, "promotionId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '???????????? ??????',
        example: '???????????? ??????',
    }),
    __metadata("design:type", String)
], GetBlogPromotionDTO.prototype, "title", void 0);
GetBlogPromotionDTO = __decorate([
    (0, class_transformer_1.Exclude)()
], GetBlogPromotionDTO);
exports.GetBlogPromotionDTO = GetBlogPromotionDTO;
let GetBlogChallengesDTO = class GetBlogChallengesDTO {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '????????? ????????? id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogChallengesDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '????????? id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogChallengesDTO.prototype, "challengeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '????????????',
        example: '??????????????????',
    }),
    __metadata("design:type", String)
], GetBlogChallengesDTO.prototype, "title", void 0);
GetBlogChallengesDTO = __decorate([
    (0, class_transformer_1.Exclude)()
], GetBlogChallengesDTO);
exports.GetBlogChallengesDTO = GetBlogChallengesDTO;
let GetBlogImageDTO = class GetBlogImageDTO {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '????????? id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogImageDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '?????? url',
        example: '{aws.s3.endpoint}/feed/filename.png',
    }),
    __metadata("design:type", String)
], GetBlogImageDTO.prototype, "fileUrl", void 0);
GetBlogImageDTO = __decorate([
    (0, class_transformer_1.Exclude)()
], GetBlogImageDTO);
exports.GetBlogImageDTO = GetBlogImageDTO;
class GetFeedViewResDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '?????? ?????????', example: GetBlogPostDTO }),
    (0, class_transformer_1.Type)(() => GetBlogPostDTO),
    __metadata("design:type", GetBlogPostDTO)
], GetFeedViewResDTO.prototype, "feed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '???????????? ??????',
        example: GetBlogPromotionDTO,
        type: [GetBlogPromotionDTO],
    }),
    (0, class_transformer_1.Type)(() => GetBlogPromotionDTO),
    __metadata("design:type", Array)
], GetFeedViewResDTO.prototype, "promotions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '????????? ??????',
        example: GetBlogChallengesDTO,
        type: [GetBlogChallengesDTO],
    }),
    (0, class_transformer_1.Type)(() => GetBlogChallengesDTO),
    __metadata("design:type", Array)
], GetFeedViewResDTO.prototype, "challenges", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '????????? ??????',
        example: GetBlogImageDTO,
        type: [GetBlogImageDTO],
    }),
    (0, class_transformer_1.Type)(() => GetBlogImageDTO),
    __metadata("design:type", Array)
], GetFeedViewResDTO.prototype, "images", void 0);
exports.GetFeedViewResDTO = GetFeedViewResDTO;
//# sourceMappingURL=feed.dto.js.map