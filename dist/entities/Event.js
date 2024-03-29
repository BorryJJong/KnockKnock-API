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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
let Event = class Event {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '이벤트 제목',
    }),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'image',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '이벤트 이미지',
    }),
    __metadata("design:type", String)
], Event.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'url',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '이벤트 홈페이지 URL',
    }),
    __metadata("design:type", String)
], Event.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'reg_date',
        type: 'timestamp',
        nullable: false,
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
        comment: '이벤트 등록일',
    }),
    __metadata("design:type", Date)
], Event.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'start_date',
        nullable: false,
        comment: '시작 날짜',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Event.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'end_date',
        nullable: true,
        comment: '종료 날짜',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Event.prototype, "endDate", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)('event', { schema: 'knockknock' })
], Event);
exports.Event = Event;
//# sourceMappingURL=Event.js.map