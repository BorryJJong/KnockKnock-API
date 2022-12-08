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
const enum_1 = require("../../shared/enums/enum");
const users_validator_1 = require("./users.validator");
const auth_service_1 = require("../../auth/auth.service");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const kakao_service_1 = require("../../auth/kakao.service");
const auth_dto_1 = require("../../auth/dto/auth.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(userService, authService, kakaoService, userValidator) {
        this.userService = userService;
        this.authService = authService;
        this.kakaoService = kakaoService;
        this.userValidator = userValidator;
    }
    async socialLogin(body) {
        const kakaoSocialUid = await this.kakaoService.getUserProperties(body.socialUuid);
        const user = await this.userService.getSocialUser({
            socialUuid: kakaoSocialUid.id.toString(),
            socialType: enum_1.SOCIAL_TYPE.KAKAO,
        });
        if (user) {
            const { accessToken, refreshToken } = await this.authService.makeJwtToken(user.id);
            await this.authService.updateRefreshToken(user.id, refreshToken);
            return new auth_dto_1.SocialLoginResponseDTO(true, new auth_dto_1.AuthInfoResponseDTO(accessToken, refreshToken));
        }
        else {
            return new auth_dto_1.SocialLoginResponseDTO(false);
        }
    }
    async signUp(body) {
        const { socialUuid, socialType, nickname } = body;
        const kakaoSocialUid = await this.kakaoService.getUserProperties(socialUuid);
        await this.userValidator.checkExistSocialUser(kakaoSocialUid.id.toString(), socialType);
        const newUser = await this.userService.saveUser({
            socialType,
            socialUuid: kakaoSocialUid.id.toString(),
            nickname,
        });
        const { accessToken, refreshToken } = await this.authService.makeJwtToken(newUser.id);
        await this.authService.updateRefreshToken(newUser.id, refreshToken);
        return new auth_dto_1.SocialLoginResponseDTO(false, new auth_dto_1.AuthInfoResponseDTO(accessToken, refreshToken));
    }
    async logout(req) {
        const requestUser = req.user;
        const user = await this.userService.getUser(requestUser.id);
        await this.userService.logout(user.id);
        return true;
    }
    async deleteUser(req) {
        const requestUser = req.user;
        const user = await this.userService.getUser(requestUser.id);
        await this.userService.deleteUser(user.id, user.socialUuid);
        return true;
    }
};
__decorate([
    (0, common_1.Post)('/social-login'),
    (0, swagger_1.ApiOperation)({ summary: '소셜 로그인' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 에러',
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
    }),
    __param(0, (0, common_1.Request)()),
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
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        kakao_service_1.KakaoService,
        users_validator_1.UserValidator])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map