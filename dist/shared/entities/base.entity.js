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
exports.BaseEnttiy = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
class BaseEnttiy {
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'id',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'ID',
    }),
    __metadata("design:type", Number)
], BaseEnttiy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        nullable: false
    }),
    (0, swagger_1.ApiProperty)({
        description: '생성일',
    }),
    __metadata("design:type", Date)
], BaseEnttiy.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        nullable: false
    }),
    (0, swagger_1.ApiProperty)({
        description: '수정일',
    }),
    __metadata("design:type", Date)
], BaseEnttiy.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        precision: 0,
    }),
    (0, swagger_1.ApiProperty)({
        description: '삭제일(soft)',
    }),
    __metadata("design:type", Date)
], BaseEnttiy.prototype, "deletedAt", void 0);
exports.BaseEnttiy = BaseEnttiy;
//# sourceMappingURL=base.entity.js.map