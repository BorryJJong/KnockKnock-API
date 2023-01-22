import { ChallengesRepository } from './challenges.repository';
import { GetListChallengeResDTO, GetChallengeReqDTO, GetChallengeResDTO, GetChallengeTitleReqDTO, GetChallengeDetailResDTO, GetChallengeListReqQueryDTO } from './dto/challenges.dto';
export declare type ChallengeSubContentJsonType = {
    title: string;
    image: string;
    content: string;
};
export declare type ChallengeContentType = {
    title: string;
    image: string;
    subTitle: string;
    rule: string[];
    subContents: ChallengeSubContentJsonType[];
};
export declare class ChallengesService {
    private readonly challengesRepository;
    constructor(challengesRepository: ChallengesRepository);
    getChallenge({ id }: GetChallengeReqDTO): Promise<GetChallengeResDTO>;
    getAllChallenges(): Promise<GetChallengeResDTO[]>;
    getChallengeDetail({ id, }: GetChallengeReqDTO): Promise<GetChallengeDetailResDTO>;
    getChallengeList(query: GetChallengeListReqQueryDTO): Promise<GetListChallengeResDTO[]>;
    getChallengeTitles(): Promise<GetChallengeTitleReqDTO[]>;
}
