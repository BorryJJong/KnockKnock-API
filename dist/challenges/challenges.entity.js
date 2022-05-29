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
exports.Challenges = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../shared/entities/base.entity");
let Challenges = class Challenges extends base_entity_1.BaseEnttiy {
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        nullable: false,
    }),
    (0, swagger_1.ApiProperty)({
        description: '챌린지명',
        example: '용기내챌린지',
        required: true,
    }),
    __metadata("design:type", String)
], Challenges.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'sub_title',
        nullable: false,
    }),
    (0, swagger_1.ApiProperty)({
        description: '서브타이틀',
        example: '용기내챌린지',
        required: true,
    }),
    __metadata("design:type", String)
], Challenges.prototype, "subTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'content',
        nullable: false,
    }),
    (0, swagger_1.ApiProperty)({
        description: '내용',
        example: '용기내챌린지 소개내용입니다',
        required: true,
    }),
    __metadata("design:type", String)
], Challenges.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'reg_date',
        nullable: false,
    }),
    (0, swagger_1.ApiProperty)({
        description: '등록날짜',
        example: '20220206',
        required: true,
    }),
    __metadata("design:type", Date)
], Challenges.prototype, "regDate", void 0);
Challenges = __decorate([
    (0, typeorm_1.Entity)('challenges')
], Challenges);
exports.Challenges = Challenges;
//# sourceMappingURL=challenges.entity.js.map