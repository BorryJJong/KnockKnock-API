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
exports.Shop = void 0;
const utils_1 = require("../shared/utils");
const typeorm_1 = require("typeorm");
let Shop = class Shop {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Shop.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '상점명',
    }),
    __metadata("design:type", String)
], Shop.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '상점 설명',
    }),
    __metadata("design:type", String)
], Shop.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'image',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '상점 이미지',
    }),
    __metadata("design:type", String)
], Shop.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'url',
        type: 'text',
        nullable: false,
        comment: '인증된 상점 홈페이지 URL or 주소',
    }),
    __metadata("design:type", String)
], Shop.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'promotion_ids',
        type: 'varchar',
        length: 30,
        nullable: false,
        comment: '프로모션 아이디',
        transformer: utils_1.stringIdsToArrayTransformer,
    }),
    __metadata("design:type", Array)
], Shop.prototype, "promotionIds", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'reg_date',
        type: 'timestamp',
        nullable: false,
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
        comment: '등록 날짜',
    }),
    __metadata("design:type", Date)
], Shop.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'del_date',
        type: 'timestamp',
        precision: 0,
        comment: '삭제 날짜',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Shop.prototype, "delDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'verified_date',
        nullable: false,
        comment: '인증 날짜',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Shop.prototype, "verifiedDate", void 0);
Shop = __decorate([
    (0, typeorm_1.Entity)('shop', { schema: 'knockknock' })
], Shop);
exports.Shop = Shop;
//# sourceMappingURL=Shop.js.map