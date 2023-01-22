import { CHALLENGES_SORT } from '@shared/enums/enum';
import { Challenges } from '../../../entities/Challenges';
import { IChallengeTitle } from '../challenges.interface';
export declare class ChallengeSubContentDTO {
    private readonly title;
    private readonly image;
    private readonly content;
    constructor(title: string, image: string, content: string);
}
export declare class ChallengeContentDTO {
    image: string;
    title: string;
    subTitle: string;
    rule: string[];
    subContents: ChallengeSubContentDTO[];
    constructor(image: string, title: string, subTitle: string, rule: string[], subContents: ChallengeSubContentDTO[]);
}
export declare class ParticipantUserDTO {
    id: number;
    nickname: string;
    image: string;
}
declare const insChallengeReqDTO_base: import("@nestjs/common").Type<Pick<Challenges, "title" | "subTitle" | "content">>;
export declare class insChallengeReqDTO extends insChallengeReqDTO_base {
}
export declare class GetChallengeReqDTO {
    id: number;
}
declare const GetChallengeResDTO_base: import("@nestjs/common").Type<Pick<Challenges, "id" | "regDate" | "title" | "subTitle" | "content">>;
export declare class GetChallengeResDTO extends GetChallengeResDTO_base {
}
export declare class GetChallengeDetailResDTO {
    private readonly challenge;
    private readonly participants;
    private readonly content;
    constructor(challenge: Challenges, participants: ParticipantUserDTO[], content: ChallengeContentDTO);
}
declare const GetListChallengeResDTO_base: import("@nestjs/common").Type<Pick<Challenges, "id" | "regDate" | "title" | "subTitle" | "content">>;
export declare class GetListChallengeResDTO extends GetListChallengeResDTO_base {
    newYn: string;
    postCnt: number;
    rnk: number;
    participants: ParticipantUserDTO[];
}
export declare class GetChallengeTitleReqDTO implements IChallengeTitle {
    id: number;
    title: string;
}
export declare class GetChallengeListReqQueryDTO {
    sort: CHALLENGES_SORT;
}
export {};
