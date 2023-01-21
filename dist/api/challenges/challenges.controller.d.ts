import { ApiResponseDTO } from '@shared/dto/response.dto';
import { ChallengesService } from './challenges.service';
import { GetListChallengeResDTO, GetChallengeReqDTO, GetChallengeTitleReqDTO, GetChallengeDetailResDTO } from './dto/challenges.dto';
export declare class ChallengesController {
    private readonly challengesService;
    constructor(challengesService: ChallengesService);
    getChallengeTitles(): Promise<ApiResponseDTO<GetChallengeTitleReqDTO[]>>;
    getChallenge(param: GetChallengeReqDTO): Promise<ApiResponseDTO<GetChallengeDetailResDTO>>;
    getChallengeList(): Promise<ApiResponseDTO<GetListChallengeResDTO[]>>;
}
