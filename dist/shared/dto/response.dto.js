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
exports.NoneDataDTO = exports.ErrorDTO = exports.ApiResponseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class ApiResponseDTO {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ground Rule(nestjs/common Http status)',
        example: '성공시 200',
    }),
    __metadata("design:type", Number)
], ApiResponseDTO.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답에 대한 결과 메세지',
        example: 'SUCCESS',
        type: String,
    }),
    __metadata("design:type", String)
], ApiResponseDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답값에 필요한 데이터',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ApiResponseDTO.prototype, "data", void 0);
exports.ApiResponseDTO = ApiResponseDTO;
class ErrorDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '실패에 대한 Http Status Code || Ground Rule(nestjs/common Http status)',
        example: 'default(500) 혹은 설정된 다른 Status Code',
    }),
    __metadata("design:type", Number)
], ErrorDTO.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답에 대한 결과 메세지',
        example: 'Error Message',
        type: String,
    }),
    __metadata("design:type", String)
], ErrorDTO.prototype, "message", void 0);
exports.ErrorDTO = ErrorDTO;
class NoneDataDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ground Rule(nestjs/common Http status)',
        example: '성공시 200',
    }),
    __metadata("design:type", Number)
], NoneDataDTO.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답에 대한 결과 메세지',
        example: 'SUCCESS',
        type: String,
    }),
    __metadata("design:type", String)
], NoneDataDTO.prototype, "message", void 0);
exports.NoneDataDTO = NoneDataDTO;
//# sourceMappingURL=response.dto.js.map