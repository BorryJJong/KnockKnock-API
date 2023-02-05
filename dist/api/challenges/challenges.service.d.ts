import { ChallengesRepository } from './challenges.repository';
import { GetChallengeReqDTO, GetChallengeResDTO, GetChallengeTitleReqDTO, GetChallengeDetailResDTO, GetChallengeListReqQueryDTO, GetChallengeListResDTO } from './dto/challenges.dto';
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
    getAllChallenges(): Promise<GetChallengeResDTO[]>;
    getChallengeDetail({ id, }: GetChallengeReqDTO): Promise<GetChallengeDetailResDTO>;
    getChallengeList(query: GetChallengeListReqQueryDTO): Promise<GetChallengeListResDTO>;
    private getNewChallenges;
    private makeChallgenImageUrl;
    getChallengeTitles(): Promise<GetChallengeTitleReqDTO[]>;
}
