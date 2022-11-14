"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const like_service_1 = require("./like.service");
const like_controller_1 = require("./like.controller");
const feed_repository_1 = require("./repository/feed.repository");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const users_service_1 = require("../users/users.service");
const users_repository_1 = require("../users/users.repository");
const kakao_service_1 = require("../../auth/kakao.service");
let LikeModule = class LikeModule {
};
LikeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([feed_repository_1.BlogLikeRepository, users_repository_1.UserRepository])],
        controllers: [like_controller_1.LikeController],
        providers: [like_service_1.LikeService, jwt_guard_1.JwtAuthGuard, users_service_1.UsersService, kakao_service_1.KakaoService],
    })
], LikeModule);
exports.LikeModule = LikeModule;
//# sourceMappingURL=like.module.js.map