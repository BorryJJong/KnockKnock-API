import { ChallengesRepository } from './challenges.repository';
import { GetChallengeListResponseDTO, GetChallengeRequestDTO, GetChallengeResponseDTO, GetChallengeTitleDTO } from './dto/challenges.dto';
export declare class ChallengesService {
    private readonly challengesRepository;
    constructor(challengesRepository: ChallengesRepository);
    getChallenge({ id, }: GetChallengeRequestDTO): Promise<GetChallengeResponseDTO>;
    getAllChallenges(): Promise<GetChallengeResponseDTO[]>;
    getChallengeList(): Promise<GetChallengeListResponseDTO[]>;
    getChallengeTitles(): Promise<GetChallengeTitleDTO[]>;
}
