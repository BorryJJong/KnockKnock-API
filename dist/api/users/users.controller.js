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
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../../shared/decorator/swagger.decorator");
const user_decorator_1 = require("../../shared/decorator/user.decorator");
const response_dto_1 = require("../../shared/dto/response.dto");
const enum_1 = require("../../shared/enums/enum");
const feed_dto_1 = require("../feed/dto/feed.dto");
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
                const result = new auth_dto_1.SocialLoginResponseDTO(true, new users_dto_1.UserInfoResDTO(user.nickname, user.socialType, user.image, user.regDate, user.deletedAt), new auth_dto_1.AuthInfoResponseDTO(accessToken, refreshToken));
                return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, result);
            }
            else {
                const isExistUser = new auth_dto_1.SocialLoginResponseDTO(false);
                return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, isExistUser);
            }
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async signUp(file, body) {
        try {
            const { socialUuid, socialType, nickname } = body;
            const userProperties = await this.getSocialLoginAttributes(socialType, socialUuid);
            await this.userValidator.checkExistSocialUser(userProperties.id.toString(), socialType);
            await this.userValidator.checkDuplicateNickname(nickname);
            const newUser = await this.userService.saveUser({
                socialType,
                socialUuid: userProperties.id.toString(),
                nickname,
            }, file);
            const { accessToken, refreshToken } = await this.authService.makeJwtToken(newUser.id);
            await this.authService.updateRefreshToken(newUser.id, refreshToken);
            const result = new auth_dto_1.SocialLoginResponseDTO(false, new users_dto_1.UserInfoResDTO(newUser.nickname, newUser.socialType, newUser.image, newUser.regDate, newUser.deletedAt), new auth_dto_1.AuthInfoResponseDTO(accessToken, refreshToken));
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, result);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async logout(user) {
        try {
            await this.userService.getUser(user.id);
            await this.userService.logout(user.id);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async deleteUser(user) {
        try {
            const findeUser = await this.userService.getUserFindOrFail(user.id);
            await this.userService.deleteUser(findeUser.id, findeUser.socialUuid, findeUser.socialType === enum_1.SOCIAL_TYPE.KAKAO);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getSocialLoginAttributes(socialType, socialUuid) {
        if (socialType === enum_1.SOCIAL_TYPE.APPLE) {
            return await this.appleService.getUserProperties(socialUuid);
        }
        else {
            return await this.kakaoService.getUserProperties(socialUuid);
        }
    }
    async profileUpdate(file, updateUserReqDTO, user) {
        try {
            if (updateUserReqDTO.nickname) {
                await this.userValidator.checkDuplicateNickname(updateUserReqDTO.nickname);
            }
            console.log('profile upload test', file.filename);
            await this.userService.profileUpdate(user.id, updateUserReqDTO, file);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async checkDuplicateNickname(param) {
        try {
            const { nickname } = param;
            const isDuplicate = await this.userService.checkDuplicateNickname(nickname);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, isDuplicate);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async hideBlogPost(param, user) {
        try {
            const { id: postId } = param;
            await this.userService.hideBlogPost(user.id, postId);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getUser(user) {
        try {
            const getUser = new users_dto_1.GetUserResDTO(user.nickname, user.socialType, user.image, user.regDate);
            return new response_dto_1.ApiResponseDTO(200, enum_1.API_RESPONSE_MEESAGE.SUCCESS, getUser);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
};
__decorate([
    (0, common_1.Post)('/social-login'),
    (0, swagger_1.ApiOperation)({ summary: '소셜 로그인' }),
    (0, swagger_decorator_1.OkApiResponseDTO)(auth_dto_1.SocialLoginResponseDTO),
    (0, swagger_decorator_1.UnauthorizedApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SocialLoginRequestDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "socialLogin", null);
__decorate([
    (0, common_1.Post)('/sign-up'),
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_decorator_1.OkApiResponseDTO)(auth_dto_1.SocialLoginResponseDTO),
    (0, swagger_decorator_1.ConflictApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.SignUpRequestDTO]),
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
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
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
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: '회원 프로필 수정' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.ConflictApiResponseDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.UpdateUserReqDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "profileUpdate", null);
__decorate([
    (0, common_1.Get)('/duplicate-nickname/:nickname'),
    (0, swagger_1.ApiOperation)({ summary: '회원 닉네임 중복 확인' }),
    (0, swagger_decorator_1.OkApiResponseDTO)(Boolean, '닉네임 중복시 true, 아니면 false'),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.GetCheckDuplicateUserNicknameReqDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkDuplicateNickname", null);
__decorate([
    (0, common_1.Post)('/hide/blog-post/:id'),
    (0, swagger_1.ApiOperation)({ summary: '피드 게시글 숨기기' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_decorator_1.OkApiResponseNoneDataDTO)(),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.PostFeedBlogPostHideReqDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "hideBlogPost", null);
__decorate([
    (0, common_1.Get)('/detail'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '유저상세 조회' }),
    (0, swagger_decorator_1.OkApiResponseDTO)(users_dto_1.GetUserResDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, user_decorator_1.UserDeco)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
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