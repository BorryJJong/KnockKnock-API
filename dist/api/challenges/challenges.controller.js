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
exports.ChallengesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../../shared/decorator/swagger.decorator");
const response_dto_1 = require("../../shared/dto/response.dto");
const enum_1 = require("../../shared/enums/enum");
const challenges_service_1 = require("./challenges.service");
const challenges_dto_1 = require("./dto/challenges.dto");
let ChallengesController = class ChallengesController {
    constructor(challengesService) {
        this.challengesService = challengesService;
    }
    async getChallengeTitles() {
        try {
            const challengeTitles = await this.challengesService.getChallengeTitles();
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, challengeTitles);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getChallenge(param) {
        try {
            const challenge = await this.challengesService.getChallengeDetail(param);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, challenge);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    async getChallengeList(query) {
        try {
            const challenges = await this.challengesService.getChallengeList(query);
            return new response_dto_1.ApiResponseDTO(common_1.HttpStatus.OK, enum_1.API_RESPONSE_MEESAGE.SUCCESS, challenges);
        }
        catch (error) {
            return new response_dto_1.ApiResponseDTO(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
};
__decorate([
    (0, common_1.Get)('/titles'),
    (0, swagger_1.ApiOperation)({
        summary: '챌린지 이름 목록 API',
        description: '피드 목록 검색에 필요한 챌린지 키워드 API',
        externalDocs: {
            description: 'Figma링크',
            url: 'https://www.figma.com/file/1g4o56bPFBBzbGfpL29jo2?node-id=1907:21526#208250263',
        },
        deprecated: false,
    }),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(challenges_dto_1.GetChallengeTitleReqDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "getChallengeTitles", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: '챌린지 상세조회' }),
    (0, swagger_decorator_1.OkApiResponseDTO)(challenges_dto_1.GetChallengeResDTO),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [challenges_dto_1.GetChallengeReqDTO]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "getChallenge", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: '챌린지 목록조회' }),
    (0, swagger_decorator_1.OkApiResponseListDataDTO)(challenges_dto_1.GetListChallengeResDTOV2),
    (0, swagger_decorator_1.DefaultErrorApiResponseDTO)(),
    (0, swagger_decorator_1.InternalServerApiResponseDTO)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [challenges_dto_1.GetChallengeListReqQueryDTO]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "getChallengeList", null);
ChallengesController = __decorate([
    (0, swagger_1.ApiTags)('challenges'),
    (0, common_1.Controller)('challenges'),
    __metadata("design:paramtypes", [challenges_service_1.ChallengesService])
], ChallengesController);
exports.ChallengesController = ChallengesController;
//# sourceMappingURL=challenges.controller.js.map