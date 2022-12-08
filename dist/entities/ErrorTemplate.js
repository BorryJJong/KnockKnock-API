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
exports.ErrorTemplate = void 0;
const enum_1 = require("../shared/enums/enum");
const typeorm_1 = require("typeorm");
let ErrorTemplate = class ErrorTemplate {
    beforeInsert() {
        this.modDate = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ErrorTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'error_code',
        type: 'enum',
        nullable: false,
        comment: '에러 코드',
        enum: enum_1.ERRPR_CODE,
        default: enum_1.ERRPR_CODE.DEFAULT,
    }),
    __metadata("design:type", String)
], ErrorTemplate.prototype, "errorCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'error_message',
        type: 'text',
        nullable: false,
        comment: '에러 메세지',
    }),
    __metadata("design:type", String)
], ErrorTemplate.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status_code',
        type: 'int',
        nullable: false,
        comment: '에러 메세지',
    }),
    __metadata("design:type", Number)
], ErrorTemplate.prototype, "statusCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'mod_date',
        type: 'timestamp',
        nullable: false,
        comment: '수정 날짜',
    }),
    __metadata("design:type", Date)
], ErrorTemplate.prototype, "modDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ErrorTemplate.prototype, "beforeInsert", null);
ErrorTemplate = __decorate([
    (0, typeorm_1.Entity)('error_template', { schema: 'knockknock' })
], ErrorTemplate);
exports.ErrorTemplate = ErrorTemplate;
//# sourceMappingURL=ErrorTemplate.js.map