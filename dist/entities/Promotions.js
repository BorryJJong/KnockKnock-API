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
exports.Promotions = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Promotions = class Promotions {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '프로모션 id',
        example: '1',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id', comment: '아이디' }),
    __metadata("design:type", Number)
], Promotions.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '프로모션 종류',
        example: '다회용기 할인',
    }),
    (0, typeorm_1.Column)('varchar', { name: 'type', comment: '종류', length: 45 }),
    __metadata("design:type", String)
], Promotions.prototype, "type", void 0);
Promotions = __decorate([
    (0, typeorm_1.Entity)('promotions', { schema: 'knockknock' })
], Promotions);
exports.Promotions = Promotions;
//# sourceMappingURL=Promotions.js.map