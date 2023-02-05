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
    private rule;
    private subContents;
    constructor(rule: string[], subContents: ChallengeSubContentDTO[]);
}
export declare class ParticipantUserDTO {
    readonly id: number;
    readonly image: string;
    constructor(id: number, image: string);
}
declare const insChallengeReqDTO_base: import("@nestjs/common").Type<Pick<Challenges, "title" | "content" | "subTitle">>;
export declare class insChallengeReqDTO extends insChallengeReqDTO_base {
}
export declare class GetChallengeReqDTO {
    id: number;
}
declare const GetChallengeResDTO_base: import("@nestjs/common").Type<Pick<Challenges, "id" | "regDate" | "title" | "content" | "subTitle">>;
export declare class GetChallengeResDTO extends GetChallengeResDTO_base {
}
export declare class GetChallengeDetailResDTO {
    private readonly id;
    private readonly title;
    private readonly subTitle;
    private readonly contentImage;
    participantCount: number;
    private readonly participants;
    private readonly content;
    constructor(id: number, title: string, subTitle: string, contentImage: string, participantCount: number, participants: ParticipantUserDTO[], content: ChallengeContentDTO);
}
declare const GetListChallengeResDTO_base: import("@nestjs/common").Type<Pick<Challenges, "id" | "regDate" | "title" | "content" | "subTitle" | "mainImage" | "contentImage">>;
export declare class GetListChallengeResDTO extends GetListChallengeResDTO_base {
    newYn: string;
    postCnt: number;
    rnk: number;
    participants: ParticipantUserDTO[];
}
export declare class GetListChallengeInfoResDTO {
    id: number;
    title: string;
    subTitle: string;
    mainImage: string;
    isHotBadge: boolean;
    isNewBadge: boolean;
    participantCount: number;
    participants: ParticipantUserDTO[];
    constructor(id: number, title: string, subTitle: string, mainImage: string, isHotBadge: boolean, isNewBadge: boolean, participantCount: number, participants: ParticipantUserDTO[]);
}
export declare class GetChallengeListResDTO {
    challengeTotalCount: number;
    challengeNewCount: number;
    challenges: GetListChallengeInfoResDTO[];
    constructor(challengeTotalCount: number, challengeNewCount: number, challenges: GetListChallengeInfoResDTO[]);
}
export declare class GetChallengeTitleReqDTO implements IChallengeTitle {
    id: number;
    title: string;
}
export declare class GetChallengeListReqQueryDTO {
    sort: CHALLENGES_SORT;
}
export {};
