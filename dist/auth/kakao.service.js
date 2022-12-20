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
exports.KakaoService = void 0;
const common_1 = require("@nestjs/common");
const got_1 = __importDefault(require("got"));
let KakaoService = class KakaoService {
    constructor() {
        this.adminKey = process.env.KAKAO_ADMIN_KEY;
        this.endPointV1 = 'https://kapi.kakao.com/v1';
        this.endPointV2 = 'https://kapi.kakao.com/v2';
        this.userMePath = '/user/me';
        this.unlinkPath = '/user/unlink';
    }
    async getUserProperties(kakaoToken) {
        try {
            const response = await got_1.default.post(`${this.endPointV2}${this.userMePath}`, {
                headers: {
                    Authorization: `Bearer ${kakaoToken}`,
                },
                responseType: 'json',
            });
            return response.body;
        }
        catch (error) {
            throw new common_1.HttpException({
                error: error.message,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async unlink(socialUuid) {
        try {
            const response = await got_1.default.post(`${this.endPointV1}${this.unlinkPath}`, {
                headers: {
                    Authorization: `KakaoAK ${this.adminKey}`,
                },
                searchParams: {
                    target_id_type: 'user_id',
                    target_id: Number(socialUuid),
                },
                responseType: 'json',
                allowGetBody: true,
            });
            const statusCode = response.statusCode;
            const { id } = response.body;
            return {
                statusCode,
                id,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                error: error.message,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
KakaoService = __decorate([
    (0, common_1.Injectable)()
], KakaoService);
exports.KakaoService = KakaoService;
//# sourceMappingURL=kakao.service.js.map