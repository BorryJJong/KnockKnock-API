"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const BlogChallenges_1 = require("../../entities/BlogChallenges");
const Challenges_1 = require("../../entities/Challenges");
const User_1 = require("../../entities/User");
const BlogPost_1 = require("../../entities/BlogPost");
const ramda_1 = require("ramda");
let ChallengesRepository = class ChallengesRepository extends typeorm_1.Repository {
    async checkExistChallenge({ id }) {
        const challenge = await this.findOne({ select: ['id'], where: { id } });
        if (challenge) {
            throw new Error('이미 존재하는 챌린지입니다.');
        }
    }
    async findChallengeById(id) {
        const challenge = await this.findOne({
            select: ['id', 'title', 'subTitle', 'content', 'regDate'],
            where: { id },
        });
        if (!challenge) {
            throw new Error('존재하지 않는 챌린지입니다.');
        }
        return challenge;
    }
    async findChallengeAll() {
        const challenges = await this.find({
            select: ['id', 'title', 'subTitle', 'content', 'regDate'],
        });
        return challenges;
    }
    async getChallengeList() {
        const userPostChallenge = (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('bp.user_id', 'user_id')
            .addSelect('bc.challenge_id', 'challenge_id')
            .from(BlogPost_1.BlogPost, 'bp')
            .innerJoin(BlogChallenges_1.BlogChallenges, 'bc', 'bp.id = bc.post_id')
            .groupBy('bp.user_id, bc.challenge_id');
        const challengePostCnt = (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('a.id', 'id')
            .addSelect('count(*)', 'post_cnt')
            .from(Challenges_1.Challenges, 'a')
            .innerJoin('(' + userPostChallenge.getQuery() + ')', 'b', 'a.id = b.challenge_id')
            .groupBy('a.id');
        const challengeList = (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('ma.id', 'id')
            .addSelect('ma.title', 'title')
            .addSelect('ma.content', 'content')
            .addSelect('ma.sub_title', 'subTitle')
            .addSelect('ma.reg_date', 'regDate')
            .addSelect("case when date_format(ma.reg_date,'%Y%m%d') between date_format(timestampadd(month, -1, sysdate()),'%Y%m%d') and date_format(sysdate(),'%Y%m%d') then 'Y' else 'N' end", 'newYn')
            .addSelect('IFNULL(mb.post_cnt,0)', 'postCnt')
            .addSelect('rank() over(order by mb.post_cnt desc)', 'rnk')
            .from(Challenges_1.Challenges, 'ma')
            .leftJoin('(' + challengePostCnt.getQuery() + ')', 'mb', 'ma.id = mb.id');
        const challengeListRaws = await challengeList.getRawMany();
        const challenges = challengeListRaws.map((s) => {
            console.log(s);
            const item = {
                id: s.id,
                title: s.title,
                subTitle: s.subTitle,
                content: s.content,
                regDate: s.regDate,
                newYn: s.newYn,
                postCnt: s.postCnt,
                rnk: s.rnk,
                participants: null,
            };
            return item;
        });
        return challenges;
    }
    async getParticipantList(challengeId) {
        console.log('ChallengeId : ' + challengeId);
        const userPostChallenge = (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('bp.user_id', 'user_id')
            .addSelect('bc.challenge_id', 'challenge_id')
            .from(BlogPost_1.BlogPost, 'bp')
            .innerJoin(BlogChallenges_1.BlogChallenges, 'bc', 'bp.id = bc.post_id')
            .where("bc.challenge_id = ':id'", { id: challengeId })
            .groupBy('bp.user_id, bc.challenge_id');
        const challengePostCnt = (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('a.id', 'id')
            .addSelect('min(reg_date)', 'reg_date')
            .from(Challenges_1.Challenges, 'a')
            .innerJoin('(' + userPostChallenge.getQuery() + ')', 'b', 'a.id = b.challenge_id')
            .groupBy('a.id');
        const participantList = (0, typeorm_1.getManager)()
            .createQueryBuilder()
            .select('ma.id', 'id')
            .addSelect('ma.nickname', 'nickname')
            .addSelect('ma.image', 'image')
            .from(User_1.User, 'ma')
            .leftJoin('(' + challengePostCnt.getQuery() + ')', 'mb', 'ma.id = mb.id')
            .orderBy('mb.reg_date', 'ASC');
        const participantListRaws = await participantList.getRawMany();
        const participants = participantListRaws.map((s) => {
            console.log(s);
            const item = {
                id: s.id,
                nickname: s.nickname,
                image: s.image,
            };
            return item;
        });
        return participants;
    }
    async getChallengeTitles() {
        return await this.manager
            .find(Challenges_1.Challenges, {
            select: ['id', 'title'],
        })
            .then((0, ramda_1.map)(challenge => {
            return {
                id: challenge.id,
                title: challenge.title,
            };
        }));
    }
};
ChallengesRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(Challenges_1.Challenges)
], ChallengesRepository);
exports.ChallengesRepository = ChallengesRepository;
//# sourceMappingURL=challenges.repository.js.map