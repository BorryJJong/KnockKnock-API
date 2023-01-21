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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../shared/dto/response.dto");
const enum_1 = require("../../shared/enums/enum");
const home_dto_1 = require("./dto/home.dto");
const home_service_1 = require("./home.service");
let HomeController = class HomeController {
    constructor(homeService) {
        this.homeService = homeService;
    }
    async getListHotFeed(query) {
        try {
            const { challengeId } = query;
            const hotFeeds = await this.homeService.getListHotFeed(challengeId);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, hotFeeds);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, enum_1.API_RESPONSE_MEESAGE.FAIL, error.message);
        }
    }
};
__decorate([
    (0, common_1.Get)('/hot-post'),
    (0, swagger_1.ApiOperation)({ summary: '오늘의 인기 게시글' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공',
        type: home_dto_1.GetListHotFeedResDTO,
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: '기본 응답 형태',
        type: response_dto_1.ApiResponseDTO,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [home_dto_1.GetListHotFeedReqDTO]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getListHotFeed", null);
HomeController = __decorate([
    (0, swagger_1.ApiTags)('home'),
    (0, common_1.Controller)('home'),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map