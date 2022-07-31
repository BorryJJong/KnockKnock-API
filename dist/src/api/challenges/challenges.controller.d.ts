import { ChallengesService } from './challenges.service';
import { GetChallengeListResponseDTO, GetChallengeRequestDTO, GetChallengeResponseDTO, GetChallengeTitleReqDTO } from './dto/challenges.dto';
export declare class ChallengesController {
    private readonly challengesService;
    constructor(challengesService: ChallengesService);
    getChallengeTitles(): Promise<GetChallengeTitleReqDTO[]>;
    getChallenge(param: GetChallengeRequestDTO): Promise<GetChallengeResponseDTO>;
    getChallengeList(): Promise<GetChallengeListResponseDTO[]>;
}
