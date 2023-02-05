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
exports.GetChallengeListReqQueryDTO = exports.GetChallengeTitleReqDTO = exports.GetChallengeListResDTO = exports.GetListChallengeInfoResDTO = exports.GetListChallengeResDTO = exports.GetChallengeDetailResDTO = exports.GetChallengeResDTO = exports.GetChallengeReqDTO = exports.insChallengeReqDTO = exports.ParticipantUserDTO = exports.ChallengeContentDTO = exports.ChallengeSubContentDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../../../shared/enums/enum");
const typeorm_1 = require("typeorm");
const Challenges_1 = require("../../../entities/Challenges");
class ChallengeSubContentDTO {
    constructor(title, image, content) {
        this.title = title;
        this.image = image;
        this.content = content;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제목', example: '제목' }),
    __metadata("design:type", String)
], ChallengeSubContentDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이미지', example: 'url' }),
    __metadata("design:type", String)
], ChallengeSubContentDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '내용', example: '내용' }),
    __metadata("design:type", String)
], ChallengeSubContentDTO.prototype, "content", void 0);
exports.ChallengeSubContentDTO = ChallengeSubContentDTO;
class ChallengeContentDTO {
    constructor(rule, subContents) {
        this.rule = rule;
        this.subContents = subContents;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '방법',
        example: '[방법]',
        isArray: true,
        required: true,
    }),
    __metadata("design:type", Array)
], ChallengeContentDTO.prototype, "rule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 서브 내용',
        example: ChallengeSubContentDTO,
        type: [ChallengeSubContentDTO],
    }),
    __metadata("design:type", Array)
], ChallengeContentDTO.prototype, "subContents", void 0);
exports.ChallengeContentDTO = ChallengeContentDTO;
class ParticipantUserDTO {
    constructor(id, image) {
        this.id = id;
        this.image = image;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자ID', example: '1' }),
    __metadata("design:type", Number)
], ParticipantUserDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이미지 URL', example: '1' }),
    __metadata("design:type", String)
], ParticipantUserDTO.prototype, "image", void 0);
exports.ParticipantUserDTO = ParticipantUserDTO;
class insChallengeReqDTO extends (0, swagger_1.PickType)(Challenges_1.Challenges, [
    'title',
    'subTitle',
    'content',
]) {
}
exports.insChallengeReqDTO = insChallengeReqDTO;
class GetChallengeReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '챌린지ID', example: '1', required: true }),
    __metadata("design:type", Number)
], GetChallengeReqDTO.prototype, "id", void 0);
exports.GetChallengeReqDTO = GetChallengeReqDTO;
class GetChallengeResDTO extends (0, swagger_1.PickType)(Challenges_1.Challenges, [
    'id',
    'title',
    'subTitle',
    'content',
    'regDate',
]) {
}
exports.GetChallengeResDTO = GetChallengeResDTO;
class GetChallengeDetailResDTO {
    constructor(id, title, subTitle, contentImage, participantCount, participants, content) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
        this.contentImage = contentImage;
        this.participantCount = participantCount;
        this.participants = participants;
        this.content = content;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '챌린지 id', example: '1' }),
    __metadata("design:type", Number)
], GetChallengeDetailResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지명',
        example: '용기내챌린지',
        required: true,
    }),
    __metadata("design:type", String)
], GetChallengeDetailResDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '서브타이틀',
        example: '용기내챌린지',
        required: true,
    }),
    __metadata("design:type", String)
], GetChallengeDetailResDTO.prototype, "subTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 상세 메인 이미지',
        example: '챌린지 상세 메인 목록 이미지',
        required: true,
    }),
    __metadata("design:type", String)
], GetChallengeDetailResDTO.prototype, "contentImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 참여중인 인원 수',
        example: '3',
        nullable: false,
    }),
    __metadata("design:type", Number)
], GetChallengeDetailResDTO.prototype, "participantCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 참여자 목록',
        isArray: true,
        required: true,
        type: [ParticipantUserDTO],
        example: ParticipantUserDTO,
    }),
    __metadata("design:type", Array)
], GetChallengeDetailResDTO.prototype, "participants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 내용',
        example: ChallengeContentDTO,
        type: ChallengeContentDTO,
    }),
    __metadata("design:type", ChallengeContentDTO)
], GetChallengeDetailResDTO.prototype, "content", void 0);
exports.GetChallengeDetailResDTO = GetChallengeDetailResDTO;
class GetListChallengeResDTO extends (0, swagger_1.PickType)(Challenges_1.Challenges, [
    'id',
    'title',
    'subTitle',
    'content',
    'regDate',
    'mainImage',
    'contentImage',
]) {
}
__decorate([
    (0, typeorm_1.Column)({
        name: 'new_yn',
        nullable: true,
    }),
    __metadata("design:type", String)
], GetListChallengeResDTO.prototype, "newYn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'post_cnt',
        nullable: true,
    }),
    __metadata("design:type", Number)
], GetListChallengeResDTO.prototype, "postCnt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rnk',
        nullable: true,
    }),
    __metadata("design:type", Number)
], GetListChallengeResDTO.prototype, "rnk", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 참여자 목록',
        example: '[]',
        isArray: true,
        required: true,
        type: [ParticipantUserDTO],
    }),
    __metadata("design:type", Array)
], GetListChallengeResDTO.prototype, "participants", void 0);
exports.GetListChallengeResDTO = GetListChallengeResDTO;
class GetListChallengeInfoResDTO {
    constructor(id, title, subTitle, mainImage, isHotBadge, isNewBadge, participantCount, participants) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
        this.mainImage = mainImage;
        this.isHotBadge = isHotBadge;
        this.isNewBadge = isNewBadge;
        this.participantCount = participantCount;
        this.participants = participants;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '챌린지 id', example: '1' }),
    __metadata("design:type", Number)
], GetListChallengeInfoResDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지명',
        example: '용기내챌린지',
        required: true,
    }),
    __metadata("design:type", String)
], GetListChallengeInfoResDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '서브타이틀',
        example: '용기내챌린지',
        required: true,
    }),
    __metadata("design:type", String)
], GetListChallengeInfoResDTO.prototype, "subTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 목록 이미지',
        example: '챌린지 목록 이미지',
        required: true,
    }),
    __metadata("design:type", String)
], GetListChallengeInfoResDTO.prototype, "mainImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hot 여부',
        example: 'true',
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], GetListChallengeInfoResDTO.prototype, "isHotBadge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'new 여부',
        example: 'true',
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], GetListChallengeInfoResDTO.prototype, "isNewBadge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 참여중인 인원 수',
        example: '3',
        nullable: false,
    }),
    __metadata("design:type", Number)
], GetListChallengeInfoResDTO.prototype, "participantCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 참여자 목록',
        isArray: true,
        example: ParticipantUserDTO,
        type: ParticipantUserDTO,
    }),
    __metadata("design:type", Array)
], GetListChallengeInfoResDTO.prototype, "participants", void 0);
exports.GetListChallengeInfoResDTO = GetListChallengeInfoResDTO;
class GetChallengeListResDTO {
    constructor(challengeTotalCount, challengeNewCount, challenges) {
        this.challengeTotalCount = challengeTotalCount;
        this.challengeNewCount = challengeNewCount;
        this.challenges = challenges;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 총 개수',
        example: '4',
        nullable: false,
    }),
    __metadata("design:type", Number)
], GetChallengeListResDTO.prototype, "challengeTotalCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '신규 챌린지 개수',
        example: '2',
        nullable: false,
    }),
    __metadata("design:type", Number)
], GetChallengeListResDTO.prototype, "challengeNewCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 정보',
        example: GetListChallengeInfoResDTO,
        type: [GetListChallengeInfoResDTO],
        nullable: false,
    }),
    __metadata("design:type", Array)
], GetChallengeListResDTO.prototype, "challenges", void 0);
exports.GetChallengeListResDTO = GetChallengeListResDTO;
class GetChallengeTitleReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '챌린지 id', example: '1' }),
    __metadata("design:type", Number)
], GetChallengeTitleReqDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '챌린지 이름', example: '챌린지' }),
    __metadata("design:type", String)
], GetChallengeTitleReqDTO.prototype, "title", void 0);
exports.GetChallengeTitleReqDTO = GetChallengeTitleReqDTO;
class GetChallengeListReqQueryDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        default: enum_1.CHALLENGES_SORT.BRAND_NEW,
        enum: enum_1.CHALLENGES_SORT,
        description: '챌린지 목록 정렬(default 최신순)',
        example: 'BRAND_NEW',
    }),
    __metadata("design:type", String)
], GetChallengeListReqQueryDTO.prototype, "sort", void 0);
exports.GetChallengeListReqQueryDTO = GetChallengeListReqQueryDTO;
//# sourceMappingURL=challenges.dto.js.map