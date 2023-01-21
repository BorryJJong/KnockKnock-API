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
exports.MyPageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../shared/decorator/user.decorator");
const response_dto_1 = require("../../shared/dto/response.dto");
const enum_1 = require("../../shared/enums/enum");
const myPage_service_1 = require("./myPage.service");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
let MyPageController = class MyPageController {
    constructor(myPageService) {
        this.myPageService = myPageService;
    }
    async isLogin(user) {
        try {
            await this.myPageService.isLogin(user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, enum_1.API_RESPONSE_MEESAGE.FAIL, true);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, enum_1.API_RESPONSE_MEESAGE.FAIL, error.message);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '마이페이지 화면 구성(로그인 or 로그아웃/회원탈퇴 확인)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공',
        type: Boolean,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '회원탈퇴유저',
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: '기본 응답 형태',
        type: response_dto_1.ApiResponseDTO,
    }),
    __param(0, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyPageController.prototype, "isLogin", null);
MyPageController = __decorate([
    (0, swagger_1.ApiTags)('my-page'),
    (0, common_1.Controller)('my-page'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [myPage_service_1.MyPageService])
], MyPageController);
exports.MyPageController = MyPageController;
//# sourceMappingURL=myPage.controller.js.map