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
exports.JwtAccessTokenStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
let JwtAccessTokenStrategy = class JwtAccessTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-access-token') {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_SECRET,
            ignoreExpiration: false,
        });
        this.authService = authService;
    }
    async validate(payload, done) {
        const user = await this.authService.tokenValidateUser(payload.sub);
        if (!user) {
            const errorText = '존재하지 않는 유저입니다.';
            return done(new common_1.HttpException({
                error: errorText,
                message: errorText,
            }, common_1.HttpStatus.UNAUTHORIZED), false);
        }
        return done(null, user);
    }
};
JwtAccessTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], JwtAccessTokenStrategy);
exports.JwtAccessTokenStrategy = JwtAccessTokenStrategy;
//# sourceMappingURL=jwtAccessToken.strategy.js.map