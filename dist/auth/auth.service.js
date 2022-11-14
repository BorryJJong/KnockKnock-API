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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const users_repository_1 = require("../api/users/users.repository");
let AuthService = class AuthService {
    constructor(jwtService, configService, userRepository) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userRepository = userRepository;
    }
    async makeJwtToken(userId) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign({
                sub: userId,
            }, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '15d',
            }),
            this.jwtService.sign({
                sub: userId,
            }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async tokenValidateUser(userId) {
        const user = await this.userRepository.findOne({
            id: userId,
        });
        return user;
    }
    async verifyToken(token) {
        const result = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
        return result;
    }
    async updateRefreshToken(userId, refreshToken) {
        await this.userRepository.updateRefreshToken(userId, refreshToken);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        users_repository_1.UserRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map