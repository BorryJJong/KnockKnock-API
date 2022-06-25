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
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
    beforeInsert() {
        this.regDate = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'nickname',
        type: 'varchar',
        comment: '닉네임',
        length: 45,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'social_uuid',
        type: 'varchar',
        nullable: false,
        comment: '소셜uuid',
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "social_uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'image',
        nullable: true,
        comment: '회원 프로필 이미지',
        type: 'text',
    }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'reg_date',
        type: 'timestamp',
        nullable: false,
        comment: '등록 날짜',
    }),
    __metadata("design:type", Date)
], User.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "beforeInsert", null);
User = __decorate([
    (0, typeorm_1.Entity)('user', { schema: 'knockknock' })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map