import { ApiResponseDTO, ErrorDTO } from '@shared/dto/response.dto';
import { ChallengesService } from './challenges.service';
import { GetChallengeReqDTO, GetChallengeTitleReqDTO, GetChallengeDetailResDTO, GetChallengeListReqQueryDTO, GetListChallengeResDTOV2 } from './dto/challenges.dto';
export declare class ChallengesController {
    private readonly challengesService;
    constructor(challengesService: ChallengesService);
    getChallengeTitles(): Promise<ApiResponseDTO<GetChallengeTitleReqDTO[] | ErrorDTO>>;
    getChallenge(param: GetChallengeReqDTO): Promise<ApiResponseDTO<GetChallengeDetailResDTO | ErrorDTO>>;
    getChallengeList(query: GetChallengeListReqQueryDTO): Promise<ApiResponseDTO<GetListChallengeResDTOV2[] | ErrorDTO>>;
}
