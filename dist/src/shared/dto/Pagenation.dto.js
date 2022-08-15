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
exports.PagenationResDTO = exports.PagenationReqDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class PagenationReqDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 페이지의 번호(기본 시작값 1부터)',
        example: '1',
    }),
    __metadata("design:type", Number)
], PagenationReqDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '페이지에 호출될 데이터 개수', example: '10' }),
    __metadata("design:type", Number)
], PagenationReqDTO.prototype, "take", void 0);
exports.PagenationReqDTO = PagenationReqDTO;
class PagenationResDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '다음 페이지 여부', example: 'true' }),
    __metadata("design:type", Boolean)
], PagenationResDTO.prototype, "isNext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '데이터 총 개수', example: '10' }),
    __metadata("design:type", Number)
], PagenationResDTO.prototype, "total", void 0);
exports.PagenationResDTO = PagenationResDTO;
//# sourceMappingURL=pagenation.dto.js.map