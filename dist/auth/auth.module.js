"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const users_repository_1 = require("../api/users/users.repository");
const apple_service_1 = require("./apple.service");
const kakao_service_1 = require("./kakao.service");
const auth_service_1 = require("./auth.service");
const jwtAccessToken_strategy_1 = require("./jwt/jwtAccessToken.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_repository_1.UserRepository]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secretOrPrivateKey: process.env.JWT_ACCESS_SECRET,
                signOptions: { expiresIn: '60d' },
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            jwtAccessToken_strategy_1.JwtAccessTokenStrategy,
            jwtAccessToken_strategy_1.JwtAccessTokenStrategy,
            kakao_service_1.KakaoService,
            config_1.ConfigService,
            apple_service_1.AppleService,
        ],
        exports: [auth_service_1.AuthService, kakao_service_1.KakaoService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map