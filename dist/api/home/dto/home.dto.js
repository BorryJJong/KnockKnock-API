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
exports.GetListHotFeedResDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
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
//# sourceMappingURL=home.dto.js.map