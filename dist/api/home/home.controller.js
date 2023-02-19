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
const swagger_decorator_1 = require("../../shared/decorator/swagger.decorator");
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
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getHomeListEvent() {
        try {
            const events = await this.homeService.getHomeListEvent();
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, events);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getListEvent(query) {
        try {
            const events = await this.homeService.getListEvent(query);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, events);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getListBanner(query) {
        try {
            const banners = await this.homeService.getListBanner(query);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, banners);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getHomeListVerifiedShop() {
        try {
            const shops = await this.homeService.getHomeListVerifiedShop();
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, shops);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getListVerifiedShop() {
        try {
            const shops = await this.homeService.getListVerifiedShop();
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, shops);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiTags)('home'),
    (0, common_1.Get)('/hot-post'),
    (0, swagger_1.ApiOperation)({ summary: '오늘의 인기 게시글' }),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(home_dto_1.GetListHotFeedResDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [home_dto_1.GetListHotFeedReqDTO]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getListHotFeed", null);
__decorate([
    (0, swagger_1.ApiTags)('home'),
    (0, common_1.Get)('/home-event'),
    (0, swagger_1.ApiOperation)({ summary: '홈화면 특별한 이벤트 목록' }),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(home_dto_1.GetHomeListEventResDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomeListEvent", null);
__decorate([
    (0, swagger_1.ApiTags)('home'),
    (0, common_1.Get)('/event'),
    (0, swagger_1.ApiOperation)({ summary: '특별한 이벤트 목록 조회' }),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(home_dto_1.GetListEventResDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [home_dto_1.GetListEventReqQueryDTO]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getListEvent", null);
__decorate([
    (0, swagger_1.ApiTags)('home'),
    (0, common_1.Get)('/banner'),
    (0, swagger_1.ApiOperation)({ summary: '배너 목록 조회' }),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(home_dto_1.GetListBannerResDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [home_dto_1.GetListBannerReqQueryDTO]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getListBanner", null);
__decorate([
    (0, swagger_1.ApiTags)('home'),
    (0, common_1.Get)('/home-verification-shop'),
    (0, swagger_1.ApiOperation)({ summary: '홈화면 인증된 상점 목록 조회' }),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(home_dto_1.GetHomeListVerifiredShopResDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomeListVerifiedShop", null);
__decorate([
    (0, swagger_1.ApiTags)('home'),
    (0, common_1.Get)('/verification-shop'),
    (0, swagger_1.ApiOperation)({ summary: '인증된 상점 목록 조회' }),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(home_dto_1.GetListVerifiredShopResDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getListVerifiedShop", null);
HomeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map