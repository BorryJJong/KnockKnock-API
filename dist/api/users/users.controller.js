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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../shared/decorator/user.decorator");
const response_dto_1 = require("../../shared/dto/response.dto");
const enum_1 = require("../../shared/enums/enum");
const users_dto_1 = require("./dto/users.dto");
const users_validator_1 = require("./users.validator");
const apple_service_1 = require("../../auth/apple.service");
const auth_service_1 = require("../../auth/auth.service");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const kakao_service_1 = require("../../auth/kakao.service");
const auth_dto_1 = require("../../auth/dto/auth.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(userService, authService, userValidator, kakaoService, appleService) {
        this.userService = userService;
        this.authService = authService;
        this.userValidator = userValidator;
        this.kakaoService = kakaoService;
        this.appleService = appleService;
    }
    async socialLogin(body) {
        try {
            const { socialType, socialUuid } = body;
            const userProperties = await this.getSocialLoginAttributes(socialType, socialUuid);
            const user = await this.userService.getSocialUser({
                socialUuid: userProperties.id.toString(),
                socialType,
            });
            if (user) {
                const { accessToken, refreshToken } = await this.authService.makeJwtToken(user.id);
                await this.authService.updateRefreshToken(user.id, refreshToken);
                const result = new auth_dto_1.SocialLoginResponseDTO(true, new users_dto_1.UserInfoResponseDTO(user.nickname, user.socialType, user.image, user.regDate, user.deletedAt), new auth_dto_1.AuthInfoResponseDTO(accessToken, refreshToken));
                return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, result);
            }
            else {
                return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, false);
            }
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, enum_1.API_RESPONSE_MEESAGE.FAIL, error.message);
        }
    }
    async signUp(body) {
        try {
            const { socialUuid, socialType, nickname } = body;
            const userProperties = await this.getSocialLoginAttributes(socialType, socialUuid);
            await this.userValidator.checkExistSocialUser(userProperties.id.toString(), socialType);
            const newUser = await this.userService.saveUser({
                socialType,
                socialUuid: userProperties.id.toString(),
                nickname,
            });
            const { accessToken, refreshToken } = await this.authService.makeJwtToken(newUser.id);
            await this.authService.updateRefreshToken(newUser.id, refreshToken);
            const result = new auth_dto_1.SocialLoginResponseDTO(false, new users_dto_1.UserInfoResponseDTO(newUser.nickname, newUser.socialType, newUser.image, newUser.regDate, newUser.deletedAt), new auth_dto_1.AuthInfoResponseDTO(accessToken, refreshToken));
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, result);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, enum_1.API_RESPONSE_MEESAGE.FAIL, error.message);
        }
    }
    async logout(user) {
        try {
            await this.userService.getUser(user.id);
            await this.userService.logout(user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, true);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, enum_1.API_RESPONSE_MEESAGE.FAIL, error.message);
        }
    }
    async deleteUser(user) {
        try {
            const findeUser = await this.userService.getUser(user.id);
            await this.userService.deleteUser(findeUser.id, findeUser.socialUuid, findeUser.socialType === enum_1.SOCIAL_TYPE.KAKAO);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, true);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, enum_1.API_RESPONSE_MEESAGE.FAIL, error.message);
        }
    }
    async getSocialLoginAttributes(socialType, socialUuid) {
        switch (socialType) {
            case enum_1.SOCIAL_TYPE.APPLE:
                return await this.appleService.getUserProperties(socialUuid);
            case enum_1.SOCIAL_TYPE.KAKAO:
                return await this.kakaoService.getUserProperties(socialUuid);
        }
    }
};
__decorate([
    (0, common_1.Post)('/social-login'),
    (0, swagger_1.ApiOperation)({ summary: '소셜 로그인' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공',
        type: auth_dto_1.SocialLoginResponseDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '회원가입필요 여부',
        type: Boolean,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 에러',
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: '기본 응답 형태',
        type: response_dto_1.ApiResponseDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SocialLoginRequestDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "socialLogin", null);
__decorate([
    (0, common_1.Post)('/sign-up'),
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공',
        type: auth_dto_1.SocialLoginResponseDTO,
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: '기본 응답 형태',
        type: response_dto_1.ApiResponseDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignUpRequestDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/logout'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '로그아웃',
        description: 'access_token을 활용해 회원 로그아웃',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그아웃 성공',
        type: Boolean,
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: '기본 응답 형태',
        type: response_dto_1.ApiResponseDTO,
    }),
    __param(0, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Delete)('/'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '회원탈퇴',
        description: 'access_token을 활용해 회원 탈퇴',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '회원탈퇴 성공',
        type: Boolean,
    }),
    (0, swagger_1.ApiDefaultResponse)({
        description: '기본 응답 형태',
        type: response_dto_1.ApiResponseDTO,
    }),
    __param(0, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        users_validator_1.UserValidator,
        kakao_service_1.KakaoService,
        apple_service_1.AppleService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map