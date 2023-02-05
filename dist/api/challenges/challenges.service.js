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
exports.ChallengesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
const challenges_repository_1 = require("./challenges.repository");
const challenges_dto_1 = require("./dto/challenges.dto");
let ChallengesService = class ChallengesService {
    constructor(challengesRepository) {
        this.challengesRepository = challengesRepository;
    }
    async getAllChallenges() {
        const challenges = await this.challengesRepository.findChallengeAll();
        return challenges;
    }
    async getChallengeDetail({ id, }) {
        const challenge = await this.challengesRepository.findChallengeById(id);
        const participantList = await this.challengesRepository.getParticipantList(id);
        const challengeContent = JSON.parse(challenge.content);
        const subContents = [];
        if (challengeContent.subContents !== undefined) {
            challengeContent.subContents.forEach((_, index) => {
                const subContent = challengeContent.subContents[index];
                subContents[index] = new challenges_dto_1.ChallengeSubContentDTO(subContent.title, this.makeChallgenImageUrl(subContent.image), subContent.content);
            });
        }
        return new challenges_dto_1.GetChallengeDetailResDTO(challenge.id, challenge.title, challenge.subTitle, this.makeChallgenImageUrl(challenge.contentImage), participantList, new challenges_dto_1.ChallengeContentDTO(this.makeChallgenImageUrl(challengeContent.image), challengeContent.rule, subContents));
    }
    async getChallengeList(query) {
        const { sort } = query;
        const challenges = await this.challengesRepository.getChallengeList(sort);
        for (let index = 0; index < challenges.length; index++) {
            const challengeId = challenges[index].id;
            const participantList = await this.challengesRepository.getParticipantList(challengeId);
            challenges[index].participants = participantList;
        }
        return challenges.map(challenge => {
            return new challenges_dto_1.GetListChallengeResDTOV2(challenge.id, challenge.title, challenge.subTitle, this.makeChallgenImageUrl(challenge.mainImage), challenge.rnk < 3, (0, date_fns_1.isAfter)(challenge.regDate, (0, date_fns_1.subDays)(new Date(), 7)), challenge.participants.length + 1, challenge.participants);
        });
    }
    makeChallgenImageUrl(imageUrl) {
        return process.env.AWS_S3_ENDPOINT + `challenges/` + imageUrl;
    }
    async getChallengeTitles() {
        const challengeTitles = await this.challengesRepository.getChallengeTitles();
        challengeTitles.unshift({ id: 0, title: '전체' });
        return challengeTitles;
    }
};
ChallengesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(challenges_repository_1.ChallengesRepository)),
    __metadata("design:paramtypes", [challenges_repository_1.ChallengesRepository])
], ChallengesService);
exports.ChallengesService = ChallengesService;
//# sourceMappingURL=challenges.service.js.map