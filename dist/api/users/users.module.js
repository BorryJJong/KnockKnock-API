"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_repository_1 = require("./users.repository");
const auth_module_1 = require("../../auth/auth.module");
const users_validator_1 = require("./users.validator");
const kakao_service_1 = require("../../auth/kakao.service");
const apple_service_1 = require("../../auth/apple.service");
const image_service_1 = require("../image/image.service");
const config_1 = require("@nestjs/config");
const blogPost_repository_1 = require("../feed/repository/blogPost.repository");
const UserToBlogPostHide_repository_1 = require("../feed/repository/UserToBlogPostHide.repository");
const UserReportBlogPost_repository_1 = require("../feed/repository/UserReportBlogPost.repository");
const UserToBlockUser_repository_1 = require("./repository/UserToBlockUser.repository");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                users_repository_1.UserRepository,
                blogPost_repository_1.BlogPostRepository,
                UserToBlogPostHide_repository_1.UserToBlogPostHideRepository,
                UserReportBlogPost_repository_1.UserReportBlogPostRepository,
                UserToBlockUser_repository_1.UserToBlockUserRepository,
            ]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            users_validator_1.UserValidator,
            kakao_service_1.KakaoService,
            apple_service_1.AppleService,
            image_service_1.ImageService,
            config_1.ConfigService,
        ],
        exports: [users_service_1.UsersService, typeorm_1.TypeOrmModule],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map