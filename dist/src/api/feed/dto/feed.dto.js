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
exports.UpdateFeedDto = exports.CreateFeedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const BlogPost_1 = require("../../../entities/BlogPost");
class CreateFeedDto extends (0, swagger_1.OmitType)(BlogPost_1.BlogPost, [
    'id',
    'hits',
    'modDate',
    'regDate',
    'delDate',
    'isDeleted',
]) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '프로모션 id', example: '1 or 1,2' }),
    __metadata("design:type", String)
], CreateFeedDto.prototype, "promotions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '챌린지 id', example: '1 or 1,2,3' }),
    __metadata("design:type", String)
], CreateFeedDto.prototype, "challenges", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이미지 binary data(multipart/form-data)' }),
    __metadata("design:type", Array)
], CreateFeedDto.prototype, "images", void 0);
exports.CreateFeedDto = CreateFeedDto;
class UpdateFeedDto extends (0, swagger_1.PartialType)(CreateFeedDto) {
}
exports.UpdateFeedDto = UpdateFeedDto;
//# sourceMappingURL=feed.dto.js.map