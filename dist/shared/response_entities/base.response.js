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
exports.BaseResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class BaseResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ground Rule Http status',
        example: '성공시 200',
    }),
    __metadata("design:type", Number)
], BaseResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답에 대한 결과 메세지',
        example: 'success or fail',
    }),
    __metadata("design:type", String)
], BaseResponse.prototype, "message", void 0);
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=base.response.js.map