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
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Challenges = class Challenges {
    beforeInsert() {
        this.regDate = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Challenges.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        type: 'varchar',
        comment: '챌린지명',
        length: 20,
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
        type: 'varchar',
        comment: '서브타이틀',
        length: 45,
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
    (0, typeorm_1.Column)({ name: 'content', type: 'text', comment: '내용', nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: '내용',
        example: '용기내챌린지 소개내용입니다',
        required: true,
    }),
    __metadata("design:type", String)
], Challenges.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'reg_date',
        type: 'timestamp',
        nullable: false,
        comment: '등록 날짜',
    }),
    __metadata("design:type", Date)
], Challenges.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Challenges.prototype, "beforeInsert", null);
Challenges = __decorate([
    (0, typeorm_1.Entity)('challenges', { schema: 'knockknock' })
], Challenges);
exports.Challenges = Challenges;
//# sourceMappingURL=Challenges.js.map