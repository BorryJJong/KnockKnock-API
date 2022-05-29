import { ChallengesService } from './challenges.service';
import { GetChallengeListResponseDTO, GetChallengeRequestDTO, GetChallengeResponseDTO } from './dto/challenges.dto';
export declare class ChallengesController {
    private readonly challengesService;
    constructor(challengesService: ChallengesService);
    getChallenge(param: GetChallengeRequestDTO): Promise<GetChallengeResponseDTO>;
    getChallengeList(): Promise<GetChallengeListResponseDTO[]>;
}
