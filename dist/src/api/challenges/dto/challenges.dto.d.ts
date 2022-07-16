import { Challenges } from '../../../entities/Challenges';
import { IChallengeTitle } from '../challenges.interface';
declare const CreateChallengeRequestDTO_base: import("@nestjs/common").Type<Pick<Challenges, "title" | "content" | "subTitle">>;
export declare class CreateChallengeRequestDTO extends CreateChallengeRequestDTO_base {
}
declare const GetChallengeRequestDTO_base: import("@nestjs/common").Type<Pick<Challenges, "id">>;
export declare class GetChallengeRequestDTO extends GetChallengeRequestDTO_base {
}
declare const GetChallengeResponseDTO_base: import("@nestjs/common").Type<Pick<Challenges, "id" | "title" | "content" | "subTitle" | "regDate">>;
export declare class GetChallengeResponseDTO extends GetChallengeResponseDTO_base {
}
declare const GetChallengeListResponseDTO_base: import("@nestjs/common").Type<Pick<Challenges, "id" | "title" | "content" | "subTitle" | "regDate">>;
export declare class GetChallengeListResponseDTO extends GetChallengeListResponseDTO_base {
    newYn: string;
    postCnt: number;
    rnk: number;
    participants: ParticipantUserDTO[];
}
export declare class ParticipantUserDTO {
    id: number;
    nickname: string;
    image: string;
}
export declare class GetChallengeTitleReqDTO implements IChallengeTitle {
    id: number;
    title: string;
}
export {};
