"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = require("jwks-rsa");
const date_fns_1 = require("date-fns");
const got_1 = __importDefault(require("got"));
let AppleService = class AppleService {
    constructor() {
        this.bundleId = process.env.APPLE_BUNDLE_ID;
        this.endPoint = 'https://appleid.apple.com';
        this.authPath = '/auth/keys';
        this.revokePath = '/auth/revoke';
    }
    async getUserProperties(appleToken) {
        try {
            const decodedToken = jsonwebtoken_1.default.decode(appleToken, { complete: true });
            const keyIdFromToken = decodedToken.header.kid;
            const applePublicKeyUrl = this.endPoint + this.authPath;
            const jwksClient = new jwks_rsa_1.JwksClient({ jwksUri: applePublicKeyUrl });
            const key = await jwksClient.getSigningKey(keyIdFromToken);
            const publicKey = key.getPublicKey();
            const payload = jsonwebtoken_1.default.verify(appleToken, publicKey, {
                algorithms: [decodedToken.header.alg],
            });
            const { iss, aud, exp, sub } = payload;
            if ((0, date_fns_1.isPast)(new Date(exp * 1000))) {
                throw new common_1.HttpException({
                    message: '애플 토큰이 만료됐습니다',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            if (iss !== this.endPoint || aud !== this.bundleId) {
                throw new common_1.HttpException({
                    message: '애플 토큰이 유효하지 않습니다',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            return {
                id: sub,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: '애플 로그인 토큰 검증 실패',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async revoke(socialUuid, client_secret) {
        try {
            const response = await got_1.default.post(`${this.endPoint}${this.revokePath}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                searchParams: {
                    client_id: this.bundleId,
                    client_secret: client_secret,
                    token: socialUuid,
                    token_type_hint: 'access_token',
                },
                responseType: 'json',
            });
            console.log(response);
        }
        catch (error) {
            throw new common_1.HttpException({
                message: '애플 회원탈퇴 토큰 검증 실패',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AppleService = __decorate([
    (0, common_1.Injectable)()
], AppleService);
exports.AppleService = AppleService;
//# sourceMappingURL=apple.service.js.map