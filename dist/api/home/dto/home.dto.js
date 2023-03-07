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
exports.GetListVerifiredShopResDTO = exports.GetHomeListVerifiredShopResDTO = exports.GetListBannerResDTO = exports.GetListBannerReqQueryDTO = exports.GetListEventReqQueryDTO = exports.GetListEventResDTO = exports.GetHomeListEventResDTO = exports.GetListHotFeedReqDTO = exports.GetListHotFeedResDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../../../shared/enums/enum");
class GetListHotFeedResDTO {
    constructor(postId, scale, nickname, fileUrl) {
        this.postId = postId;
        this.scale = scale;
        this.nickname = nickname;
        this.fileUrl = fileUrl;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '게시글 id', example: '1' }),
    __metadata("design:type", Number)
], GetListHotFeedResDTO.prototype, "postId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '게시글 내 이미지의 비율', example: '1:1' }),
    __metadata("design:type", String)
], GetListHotFeedResDTO.prototype, "scale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 닉네임',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], GetListHotFeedResDTO.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '블로그의 이미지 URL',
        example: '{aws.s3.endpoint}/feed/filename.png',
    }),
    __metadata("design:type", String)
], GetListHotFeedResDTO.prototype, "fileUrl", void 0);
exports.GetListHotFeedResDTO = GetListHotFeedResDTO;
class GetListHotFeedReqDTO {
    constructor(challengeId) {
        this.challengeId = challengeId;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '챌린지 id', example: '1' }),
    __metadata("design:type", Number)
], GetListHotFeedReqDTO.prototype, "challengeId", void 0);
exports.GetListHotFeedReqDTO = GetListHotFeedReqDTO;
class GetHomeListEventResDTO {
    constructor(id, isNewBadge, title, eventPeriod, image) {
        this.id = id;
        this.isNewBadge = isNewBadge;
        this.title = title;
        this.eventPeriod = eventPeriod;
        this.image = image;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 ID',
        example: '1',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", Number)
], GetHomeListEventResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New 뱃지 여부(생성일 2주이내)',
        example: 'true',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", Boolean)
], GetHomeListEventResDTO.prototype, "isNewBadge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 제목',
        example: '[스타벅스] 지구의날 온라인',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetHomeListEventResDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 기간',
        example: '시작일~종료일(혹은 미정) / YYYY.MM.DD ~ YYYY.MM.DD or 미정',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetHomeListEventResDTO.prototype, "eventPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 대표 이미지 URL',
        example: '{aws.s3.endpoint}/event/filename.png',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetHomeListEventResDTO.prototype, "image", void 0);
exports.GetHomeListEventResDTO = GetHomeListEventResDTO;
class GetListEventResDTO {
    constructor(id, isNewBadge, isEndEvent, title, eventPeriod, image, url) {
        this.id = id;
        this.isNewBadge = isNewBadge;
        this.isEndEvent = isEndEvent;
        this.title = title;
        this.eventPeriod = eventPeriod;
        this.image = image;
        this.url = url;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 ID',
        example: '1',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", Number)
], GetListEventResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New 뱃지 여부(생성일 2주이내)',
        example: 'true',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", Boolean)
], GetListEventResDTO.prototype, "isNewBadge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 종료 여부',
        example: 'true',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", Boolean)
], GetListEventResDTO.prototype, "isEndEvent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 제목',
        example: '[스타벅스] 지구의날 온라인',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetListEventResDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 기간',
        example: '시작일~종료일(혹은 미정) / YYYY.MM.DD ~ YYYY.MM.DD or 미정',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetListEventResDTO.prototype, "eventPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 대표 이미지 URL',
        example: '{aws.s3.endpoint}/event/filename.png',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetListEventResDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 홈페이지 URL',
        example: 'https://github.com',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetListEventResDTO.prototype, "url", void 0);
exports.GetListEventResDTO = GetListEventResDTO;
class GetListEventReqQueryDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        default: enum_1.EVENT_TAP.ONGOING,
        enum: enum_1.EVENT_TAP,
        description: '이벤트 탭별 조회(default 진행중)',
        example: 'ONGOING',
    }),
    __metadata("design:type", String)
], GetListEventReqQueryDTO.prototype, "eventTap", void 0);
exports.GetListEventReqQueryDTO = GetListEventReqQueryDTO;
class GetListBannerReqQueryDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: enum_1.BANNER_TYPE,
        description: '배너 종류별 목록 조회',
        example: 'MAIN',
    }),
    __metadata("design:type", String)
], GetListBannerReqQueryDTO.prototype, "bannerType", void 0);
exports.GetListBannerReqQueryDTO = GetListBannerReqQueryDTO;
class GetListBannerResDTO {
    constructor(id, image, type) {
        this.id = id;
        this.image = image;
        this.type = type;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '배너 ID',
        example: '1',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", Number)
], GetListBannerResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '배너 이미지 URL',
        example: '{aws.s3.endpoint}/event/filename.png',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetListBannerResDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: enum_1.BANNER_TYPE,
        description: '배너 타입(MAIN, BAR)',
        example: 'MAIN',
    }),
    __metadata("design:type", String)
], GetListBannerResDTO.prototype, "type", void 0);
exports.GetListBannerResDTO = GetListBannerResDTO;
class GetHomeListVerifiredShopResDTO {
    constructor(name, description, image, shopPromotionNames) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.shopPromotionNames = shopPromotionNames;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장명',
        example: '제로띵스',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetHomeListVerifiredShopResDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 설명',
        example: '일상에 스며드는 초록색 소비를 제안합니다',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetHomeListVerifiredShopResDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 이미지',
        example: '{aws.s3.endpoint}/event/filename.png',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetHomeListVerifiredShopResDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상점의 프로모션 이름들',
        example: '[텀블러 할인, 사은품 증정]',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", Array)
], GetHomeListVerifiredShopResDTO.prototype, "shopPromotionNames", void 0);
exports.GetHomeListVerifiredShopResDTO = GetHomeListVerifiredShopResDTO;
class GetListVerifiredShopResDTO {
    constructor(id, name, description, image, shopPromotionNames, url, locationX, locationY) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.shopPromotionNames = shopPromotionNames;
        this.url = url;
        this.locationX = locationX;
        this.locationY = locationY;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상점 ID',
        example: '1',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", Number)
], GetListVerifiredShopResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장명',
        example: '제로띵스',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetListVerifiredShopResDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 설명',
        example: '일상에 스며드는 초록색 소비를 제안합니다',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetListVerifiredShopResDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 이미지',
        example: '{aws.s3.endpoint}/event/filename.png',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetListVerifiredShopResDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상점의 프로모션 이름들',
        example: '[텀블러 할인, 사은품 증정]',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", Array)
], GetListVerifiredShopResDTO.prototype, "shopPromotionNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '인증된 상점 홈페이지 URL or 주소',
        example: 'https://github.com',
        nullable: false,
        required: true,
    }),
    __metadata("design:type", String)
], GetListVerifiredShopResDTO.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 주소 x좌표(위도)',
        example: '126.9903113',
        required: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], GetListVerifiredShopResDTO.prototype, "locationX", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 주소 y좌표(경도)',
        example: '37.3771012046504',
        required: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], GetListVerifiredShopResDTO.prototype, "locationY", void 0);
exports.GetListVerifiredShopResDTO = GetListVerifiredShopResDTO;
//# sourceMappingURL=home.dto.js.map