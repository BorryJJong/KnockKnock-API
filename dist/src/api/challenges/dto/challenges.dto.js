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
exports.GetChallengeTitleDTO = exports.ParticipantUserDTO = exports.GetChallengeListResponseDTO = exports.GetChallengeResponseDTO = exports.GetChallengeRequestDTO = exports.CreateChallengeRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Challenges_1 = require("../../../entities/Challenges");
class CreateChallengeRequestDTO extends (0, swagger_1.PickType)(Challenges_1.Challenges, [
    'title',
    'subTitle',
    'content',
]) {
}
exports.CreateChallengeRequestDTO = CreateChallengeRequestDTO;
class GetChallengeRequestDTO extends (0, swagger_1.PickType)(Challenges_1.Challenges, [
    'id',
]) {
}
exports.GetChallengeRequestDTO = GetChallengeRequestDTO;
class GetChallengeResponseDTO extends (0, swagger_1.PickType)(Challenges_1.Challenges, [
    'id',
    'title',
    'subTitle',
    'content',
    'regDate',
]) {
}
exports.GetChallengeResponseDTO = GetChallengeResponseDTO;
class GetChallengeListResponseDTO extends (0, swagger_1.PickType)(Challenges_1.Challenges, [
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
], GetChallengeListResponseDTO.prototype, "newYn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'post_cnt',
        nullable: true,
    }),
    __metadata("design:type", Number)
], GetChallengeListResponseDTO.prototype, "postCnt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rnk',
        nullable: true,
    }),
    __metadata("design:type", Number)
], GetChallengeListResponseDTO.prototype, "rnk", void 0);
exports.GetChallengeListResponseDTO = GetChallengeListResponseDTO;
class ParticipantUserDTO {
}
exports.ParticipantUserDTO = ParticipantUserDTO;
class GetChallengeTitleDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '챌린지 id', example: '1' }),
    __metadata("design:type", Number)
], GetChallengeTitleDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제목', example: '챌린지' }),
    __metadata("design:type", String)
], GetChallengeTitleDTO.prototype, "title", void 0);
exports.GetChallengeTitleDTO = GetChallengeTitleDTO;
//# sourceMappingURL=challenges.dto.js.map