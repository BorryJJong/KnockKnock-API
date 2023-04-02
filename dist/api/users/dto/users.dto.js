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
exports.BlockUserParamDTO = exports.GetUserResDTO = exports.GetCheckDuplicateUserNicknameReqDTO = exports.UpdateUserReqDTO = exports.UserInfoResDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../../../shared/enums/enum");
class UserInfoResDTO {
    constructor(nickname, socialType, image, regDate, deletedAt) {
        this.nickname = nickname;
        this.socialType = socialType;
        this.image = image;
        this.regDate = regDate;
        this.deletedAt = deletedAt;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'jerry', description: '닉네임' }),
    __metadata("design:type", String)
], UserInfoResDTO.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.SOCIAL_TYPE, example: 'KAKAO', description: '소셜 종류' }),
    __metadata("design:type", String)
], UserInfoResDTO.prototype, "socialType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '', description: '회원 프로필 이미지' }),
    __metadata("design:type", String)
], UserInfoResDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '', description: '등록 날짜' }),
    __metadata("design:type", Date)
], UserInfoResDTO.prototype, "regDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        required: false,
        example: '',
        description: '회원탈퇴 날짜',
    }),
    __metadata("design:type", Object)
], UserInfoResDTO.prototype, "deletedAt", void 0);
exports.UserInfoResDTO = UserInfoResDTO;
class UpdateUserReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        nullable: true,
        required: false,
        description: '닉네임',
    }),
    __metadata("design:type", String)
], UpdateUserReqDTO.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'file',
        nullable: true,
        required: false,
        description: '이미지 파일 업로드',
    }),
    __metadata("design:type", Object)
], UpdateUserReqDTO.prototype, "image", void 0);
exports.UpdateUserReqDTO = UpdateUserReqDTO;
class GetCheckDuplicateUserNicknameReqDTO {
    constructor(nickname) {
        this.nickname = nickname;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        nullable: false,
        example: 'jerry',
        description: '닉네임',
    }),
    __metadata("design:type", String)
], GetCheckDuplicateUserNicknameReqDTO.prototype, "nickname", void 0);
exports.GetCheckDuplicateUserNicknameReqDTO = GetCheckDuplicateUserNicknameReqDTO;
class GetUserResDTO {
    constructor(nickname, socialType, image, regDate) {
        this.nickname = nickname;
        this.socialType = socialType;
        this.image = image;
        this.regDate = regDate;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'jerry', description: '닉네임' }),
    __metadata("design:type", String)
], GetUserResDTO.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.SOCIAL_TYPE, example: 'KAKAO', description: '소셜 종류' }),
    __metadata("design:type", String)
], GetUserResDTO.prototype, "socialType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '', description: '회원 프로필 이미지' }),
    __metadata("design:type", String)
], GetUserResDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '', description: '회원 가입 날짜' }),
    __metadata("design:type", Date)
], GetUserResDTO.prototype, "regDate", void 0);
exports.GetUserResDTO = GetUserResDTO;
class BlockUserParamDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '유저 id', example: '1' }),
    __metadata("design:type", Number)
], BlockUserParamDTO.prototype, "id", void 0);
exports.BlockUserParamDTO = BlockUserParamDTO;
//# sourceMappingURL=users.dto.js.map