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
exports.GetChallengeListReqQueryDTO = exports.GetChallengeTitleReqDTO = exports.GetListChallengeResDTO = exports.GetChallengeDetailResDTO = exports.GetChallengeResDTO = exports.GetChallengeReqDTO = exports.insChallengeReqDTO = exports.ParticipantUserDTO = exports.ChallengeContentDTO = exports.ChallengeSubContentDTO = void 0;
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
    constructor(image, title, subTitle, rule, subContents) {
        this.image = image;
        this.title = title;
        this.subTitle = subTitle;
        this.rule = rule;
        this.subContents = subContents;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이미지', example: 'url' }),
    __metadata("design:type", String)
], ChallengeContentDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제목', example: '제목' }),
    __metadata("design:type", String)
], ChallengeContentDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부제목', example: '부제목' }),
    __metadata("design:type", String)
], ChallengeContentDTO.prototype, "subTitle", void 0);
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
        example: '',
        type: [ChallengeContentDTO],
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
    constructor(challenge, participants, content) {
        this.challenge = challenge;
        this.participants = participants;
        this.content = content;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '챌린지 이름', example: '챌린지' }),
    __metadata("design:type", Challenges_1.Challenges)
], GetChallengeDetailResDTO.prototype, "challenge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 참여자 목록',
        example: '[]',
        isArray: true,
        required: true,
        type: [ParticipantUserDTO],
    }),
    __metadata("design:type", Array)
], GetChallengeDetailResDTO.prototype, "participants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '챌린지 이름',
        example: '챌린지',
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