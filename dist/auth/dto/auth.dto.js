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
exports.SignUpResponseDTO = exports.SignUpRequestDTO = exports.SocialLoginRequestDTO = exports.SocialLoginResponseDTO = exports.AuthInfoResponseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../../shared/enums/enum");
const class_validator_1 = require("class-validator");
class AuthInfoResponseDTO {
    constructor(accessToken, refreashToken) {
        this.accessToken = accessToken;
        this.refreashToken = refreashToken;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'access_token', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthInfoResponseDTO.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'refreash_token', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthInfoResponseDTO.prototype, "refreashToken", void 0);
exports.AuthInfoResponseDTO = AuthInfoResponseDTO;
class SocialLoginResponseDTO {
    constructor(isExistUser, authInfo) {
        this.isExistUser = isExistUser;
        this.authInfo = authInfo;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '회원가입 유무', example: 'true', type: Boolean }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SocialLoginResponseDTO.prototype, "isExistUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 정보',
        example: AuthInfoResponseDTO,
        type: AuthInfoResponseDTO,
        required: false,
    }),
    __metadata("design:type", AuthInfoResponseDTO)
], SocialLoginResponseDTO.prototype, "authInfo", void 0);
exports.SocialLoginResponseDTO = SocialLoginResponseDTO;
class SocialLoginRequestDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '소셜 UUID',
        example: '플랫폼(kakao, apple)에서 제공해주는 socialUuid',
    }),
    __metadata("design:type", String)
], SocialLoginRequestDTO.prototype, "socialUuid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '소셜 종류(kakao, apple)',
        example: 'KAKAO',
        enum: enum_1.SOCIAL_TYPE,
    }),
    __metadata("design:type", String)
], SocialLoginRequestDTO.prototype, "socialType", void 0);
exports.SocialLoginRequestDTO = SocialLoginRequestDTO;
class SignUpRequestDTO extends SocialLoginRequestDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '닉네임', example: 'hiYong94' }),
    __metadata("design:type", String)
], SignUpRequestDTO.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이미지 파일 업로드', example: '' }),
    __metadata("design:type", String)
], SignUpRequestDTO.prototype, "image", void 0);
exports.SignUpRequestDTO = SignUpRequestDTO;
class SignUpResponseDTO {
    constructor(authInfo) {
        this.authInfo = authInfo;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 정보',
        example: AuthInfoResponseDTO,
        type: AuthInfoResponseDTO,
    }),
    __metadata("design:type", AuthInfoResponseDTO)
], SignUpResponseDTO.prototype, "authInfo", void 0);
exports.SignUpResponseDTO = SignUpResponseDTO;
//# sourceMappingURL=auth.dto.js.map