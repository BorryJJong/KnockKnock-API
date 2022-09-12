import { ChallengesService } from './challenges.service';
import { GetListChallengeResDTO, GetChallengeReqDTO, GetChallengeTitleReqDTO, GetChallengeDetailResDTO } from './dto/challenges.dto';
export declare class ChallengesController {
    private readonly challengesService;
    constructor(challengesService: ChallengesService);
    getChallengeTitles(): Promise<GetChallengeTitleReqDTO[]>;
    getChallenge(param: GetChallengeReqDTO): Promise<GetChallengeDetailResDTO>;
    getChallengeList(): Promise<GetListChallengeResDTO[]>;
}
