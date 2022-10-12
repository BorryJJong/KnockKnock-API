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
exports.GetListFeedCommentReqDTO = exports.GetListFeedCommentResDTO = exports.GetBlogCommentDTO = exports.InsBlogCommentDTO = exports.GetFeedViewResDTO = exports.GetBlogImageDTO = exports.GetBlogChallengesDTO = exports.GetBlogPromotionDTO = exports.GetBlogPostDTO = exports.GetFeedViewReqDTO = exports.GetListFeedResDTO = exports.GetFeedResDTO = exports.GetFeedImageResDTO = exports.GetListFeedReqQueryDTO = exports.GetListBlogImageByBlogPostResDTO = exports.GetListFeedMainResDTO = exports.GetFeedMainResDTO = exports.GetListFeedMainReqDTO = exports.UpdateFeedDto = exports.CreateBlogImageDTO = exports.CreateBlogPromotionDTO = exports.CreateBlogChallengesDTO = exports.CreateBlogPostDTO = exports.UpdateFeedDTO = exports.CreateFeedDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const BlogChallenges_1 = require("../../../entities/BlogChallenges");
const BlogPromotion_1 = require("../../../entities/BlogPromotion");
const BlogImage_1 = require("../../../entities/BlogImage");
const BlogPost_1 = require("../../../entities/BlogPost");
const BlogComment_1 = require("../../../entities/BlogComment");
const pagenation_dto_1 = require("../../../shared/dto/pagenation.dto");
const utils_1 = require("../../../shared/utils");
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
class GetListFeedMainReqDTO extends pagenation_dto_1.PagenationReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: '챌린지ID', example: '1' }),
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
    (0, swagger_1.ApiProperty)({ description: '피드ID', example: '1' }),
    __metadata("design:type", Number)
], GetFeedMainResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '썸네일 이미지 url',
        example: '{aws.s3.endpoint}/feed/filename.png',
    }),
    __metadata("design:type", String)
], GetFeedMainResDTO.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이미지가 2장 이상일 경우 true', example: 'true' }),
    __metadata("design:type", Boolean)
], GetFeedMainResDTO.prototype, "isImageMore", void 0);
exports.GetFeedMainResDTO = GetFeedMainResDTO;
class GetListFeedMainResDTO extends pagenation_dto_1.PagenationResDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '피드 메인 목록',
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
class GetListFeedReqQueryDTO extends pagenation_dto_1.PagenationReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: '피드ID', example: '1' }),
    __metadata("design:type", Number)
], GetListFeedReqQueryDTO.prototype, "feedId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '챌린지ID', example: '1' }),
    __metadata("design:type", Number)
], GetListFeedReqQueryDTO.prototype, "challengeId", void 0);
exports.GetListFeedReqQueryDTO = GetListFeedReqQueryDTO;
class GetFeedImageResDTO {
    constructor(id, fileUrl) {
        this.id = id;
        this.fileUrl = fileUrl;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '피드 이미지 id', example: '1' }),
    __metadata("design:type", Number)
], GetFeedImageResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '피드 이미지 url',
        example: '{aws.s3.endpoint}/feed/filename.png',
    }),
    __metadata("design:type", String)
], GetFeedImageResDTO.prototype, "fileUrl", void 0);
exports.GetFeedImageResDTO = GetFeedImageResDTO;
class GetFeedResDTO {
    constructor(id, userName, userImage, content, regDateToString, scale, blogLikeCount, isLike, blogCommentCount, blogImages) {
        this.id = id;
        this.userName = userName;
        this.userImage = userImage;
        this.content = content;
        this.regDateToString = regDateToString;
        this.scale = scale;
        this.blogLikeCount = blogLikeCount;
        this.isLike = isLike;
        this.blogCommentCount = blogCommentCount;
        this.blogImages = blogImages.map(blogImage => new GetFeedImageResDTO(blogImage.id, blogImage.fileUrl));
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '피드ID', example: '1' }),
    __metadata("design:type", Number)
], GetFeedResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '글쓴이 닉네임', example: 'sungmin_kim94' }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '글쓴이 프로필 이미지',
        example: 'https://github.com/hiong04',
    }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "userImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '게시글 내용',
        example: '패키지 상품을 받았을때의 기쁨 후엔 늘 골치아픈 쓰레기와 분리수거',
    }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '작성 시간(생성일)', example: '1시간전' }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "regDateToString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '게시글 내 이미지의 비율', example: '1:1' }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "scale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '피드 이미지 목록',
        type: GetFeedImageResDTO,
        example: GetFeedImageResDTO,
    }),
    __metadata("design:type", Array)
], GetFeedResDTO.prototype, "blogImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '좋아요 개수', example: '1,301' }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "blogLikeCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '좋아요 선택 여부', example: 'true' }),
    __metadata("design:type", Boolean)
], GetFeedResDTO.prototype, "isLike", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '댓글 개수', example: '2,456' }),
    __metadata("design:type", String)
], GetFeedResDTO.prototype, "blogCommentCount", void 0);
exports.GetFeedResDTO = GetFeedResDTO;
class GetListFeedResDTO extends pagenation_dto_1.PagenationResDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '피드 게시글 목록',
        type: GetFeedResDTO,
        example: GetFeedResDTO,
    }),
    __metadata("design:type", Array)
], GetListFeedResDTO.prototype, "feeds", void 0);
exports.GetListFeedResDTO = GetListFeedResDTO;
class GetFeedViewReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '피드 id', example: '1' }),
    __metadata("design:type", Number)
], GetFeedViewReqDTO.prototype, "id", void 0);
exports.GetFeedViewReqDTO = GetFeedViewReqDTO;
let GetBlogPostDTO = class GetBlogPostDTO {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '게시글 id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogPostDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '사용자 id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogPostDTO.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '내용',
        example: '패키지 상품을 받았을때의 기쁨 후엔 늘 골치아픈 쓰레기와 분리수거의 노동시간이 뒤따릅니다.',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '매장 주소',
        example: '경기 성남시 분당구 대왕판교로 374',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "storeAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '매장 주소 x좌표',
        example: '127.102269186127',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "locationX", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '매장 주소 y좌표',
        example: '37.3771012046504',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "locationY", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '등록 날짜',
        example: '시간 -> text 변환 작업 아직 안함',
    }),
    __metadata("design:type", Date)
], GetBlogPostDTO.prototype, "regDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '사용자 닉네임',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '사용자 프로필 이미지',
        example: '{aws.s3.endpoint}/user/filename.png',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "userImage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '게시글 내 이미지의 비율',
        example: '1:1',
    }),
    __metadata("design:type", String)
], GetBlogPostDTO.prototype, "scale", void 0);
GetBlogPostDTO = __decorate([
    (0, class_transformer_1.Exclude)()
], GetBlogPostDTO);
exports.GetBlogPostDTO = GetBlogPostDTO;
let GetBlogPromotionDTO = class GetBlogPromotionDTO {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '블로그 프로모션 id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogPromotionDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '프로모션 id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogPromotionDTO.prototype, "promotionId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '프로모션 종류',
        example: '다회용기 할인',
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
        description: '블로그 챌린지 id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogChallengesDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '챌린지 id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogChallengesDTO.prototype, "challengeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '챌린지명',
        example: '용기내챌린지',
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
        description: '이미지 id',
        example: '1',
    }),
    __metadata("design:type", Number)
], GetBlogImageDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '파일 url',
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
    (0, swagger_1.ApiProperty)({ description: '피드 데이터', example: GetBlogPostDTO }),
    (0, class_transformer_1.Type)(() => GetBlogPostDTO),
    __metadata("design:type", GetBlogPostDTO)
], GetFeedViewResDTO.prototype, "feed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '프로모션 목록',
        example: GetBlogPromotionDTO,
        type: [GetBlogPromotionDTO],
    }),
    (0, class_transformer_1.Type)(() => GetBlogPromotionDTO),
    __metadata("design:type", Array)
], GetFeedViewResDTO.prototype, "promotions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 목록',
        example: GetBlogChallengesDTO,
        type: [GetBlogChallengesDTO],
    }),
    (0, class_transformer_1.Type)(() => GetBlogChallengesDTO),
    __metadata("design:type", Array)
], GetFeedViewResDTO.prototype, "challenges", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이미지 목록',
        example: GetBlogImageDTO,
        type: [GetBlogImageDTO],
    }),
    (0, class_transformer_1.Type)(() => GetBlogImageDTO),
    __metadata("design:type", Array)
], GetFeedViewResDTO.prototype, "images", void 0);
exports.GetFeedViewResDTO = GetFeedViewResDTO;
class InsBlogCommentDTO extends (0, swagger_1.OmitType)(BlogComment_1.BlogComment, [
    'id',
    'regDate',
    'delDate',
    'isDeleted',
]) {
}
exports.InsBlogCommentDTO = InsBlogCommentDTO;
let GetBlogCommentDTO = class GetBlogCommentDTO {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '댓글 아이디',
        example: 1,
    }),
    __metadata("design:type", Number)
], GetBlogCommentDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '사용자 아이디',
        example: 1,
    }),
    __metadata("design:type", Number)
], GetBlogCommentDTO.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '사용자 닉네임',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], GetBlogCommentDTO.prototype, "nickname", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '사용자 프로필 이미지',
        example: '{aws.s3.endpoint}/user/filename.png',
    }),
    __metadata("design:type", String)
], GetBlogCommentDTO.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '내용',
        example: '잘 봤습니다.',
    }),
    __metadata("design:type", String)
], GetBlogCommentDTO.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '등록 날짜',
        example: '1일 전',
    }),
    (0, class_transformer_1.Transform)(r => (0, utils_1.convertTimeToStr)((0, utils_1.convertTime)(r.value))),
    __metadata("design:type", Date)
], GetBlogCommentDTO.prototype, "regDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '삭제 여부',
        example: 'false',
    }),
    __metadata("design:type", Boolean)
], GetBlogCommentDTO.prototype, "isDeleted", void 0);
GetBlogCommentDTO = __decorate([
    (0, class_transformer_1.Exclude)()
], GetBlogCommentDTO);
exports.GetBlogCommentDTO = GetBlogCommentDTO;
let GetListFeedCommentResDTO = class GetListFeedCommentResDTO extends GetBlogCommentDTO {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiProperty)({ description: '리댓글 개수', example: 5 }),
    __metadata("design:type", Number)
], GetListFeedCommentResDTO.prototype, "replyCnt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: '리댓글 목록',
        example: GetBlogCommentDTO,
        type: [GetBlogCommentDTO],
    }),
    (0, class_transformer_1.Type)(() => GetBlogCommentDTO),
    __metadata("design:type", Array)
], GetListFeedCommentResDTO.prototype, "reply", void 0);
GetListFeedCommentResDTO = __decorate([
    (0, class_transformer_1.Exclude)()
], GetListFeedCommentResDTO);
exports.GetListFeedCommentResDTO = GetListFeedCommentResDTO;
class GetListFeedCommentReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '피드 id', example: '1' }),
    __metadata("design:type", Number)
], GetListFeedCommentReqDTO.prototype, "id", void 0);
exports.GetListFeedCommentReqDTO = GetListFeedCommentReqDTO;
//# sourceMappingURL=feed.dto.js.map