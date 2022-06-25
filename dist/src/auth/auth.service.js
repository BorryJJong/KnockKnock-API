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
const jwt_1 = require("@nestjs/jwt");
const users_repository_1 = require("../api/users/users.repository");
const utils_1 = require("../shared/utils");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(user) {
        if (!user) {
            throw new common_1.UnauthorizedException('존재하지 않는 유저입니다.');
        }
    }
    async validatePassword(password, hash) {
        if (await !(0, utils_1.isComparePassword)(password, hash)) {
            throw new common_1.UnauthorizedException('올바른 비밀번호가 아닙니다.');
        }
    }
    async jwtLogin({ email, password }) {
        const user = await this.userRepository.findUserByEmail(email);
        await this.validateUser(user);
        await this.validatePassword(password, user.password);
        const payload = { email, sub: user.id.toString() };
        return {
            id: user.id,
            accessToken: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map