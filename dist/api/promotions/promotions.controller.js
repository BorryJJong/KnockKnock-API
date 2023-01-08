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
exports.PromotionsController = void 0;
const common_1 = require("@nestjs/common");
const promotions_service_1 = require("./promotions.service");
const swagger_1 = require("@nestjs/swagger");
const Promotions_1 = require("../../entities/Promotions");
const response_dto_1 = require("../../shared/dto/response.dto");
const enum_1 = require("../../shared/enums/enum");
let PromotionsController = class PromotionsController {
    constructor(promotionsService) {
        this.promotionsService = promotionsService;
    }
    async findAll() {
        try {
            const promotions = await this.promotionsService.findAll();
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, promotions);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, enum_1.API_RESPONSE_MEESAGE.FAIL, error.message);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '프로모션 리스트' }),
    (0, swagger_1.ApiOkResponse)({
        description: '성공',
        type: [Promotions_1.Promotions],
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: '기본 응답 형태',
        type: response_dto_1.ApiResponseDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromotionsController.prototype, "findAll", null);
PromotionsController = __decorate([
    (0, swagger_1.ApiTags)('promotions'),
    (0, common_1.Controller)('promotions'),
    __metadata("design:paramtypes", [promotions_service_1.PromotionsService])
], PromotionsController);
exports.PromotionsController = PromotionsController;
//# sourceMappingURL=promotions.controller.js.map