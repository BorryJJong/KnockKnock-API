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
exports.Banner = void 0;
const enum_1 = require("../shared/enums/enum");
const typeorm_1 = require("typeorm");
let Banner = class Banner {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Banner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        type: 'varchar',
        length: 50,
        nullable: false,
        comment: '배너 타입',
    }),
    __metadata("design:type", String)
], Banner.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'image',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '배너 이미지',
    }),
    __metadata("design:type", String)
], Banner.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'reg_date',
        type: 'timestamp',
        nullable: false,
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
        comment: '배너 등록일',
    }),
    __metadata("design:type", Date)
], Banner.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'expose_date',
        nullable: false,
        comment: '노출 날짜',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Banner.prototype, "exposeDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'expire_date',
        nullable: true,
        comment: '만료 날짜',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Banner.prototype, "expireDate", void 0);
Banner = __decorate([
    (0, typeorm_1.Entity)('banner', { schema: 'knockknock' })
], Banner);
exports.Banner = Banner;
//# sourceMappingURL=Banner.js.map