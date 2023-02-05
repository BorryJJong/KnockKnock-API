/// <reference types="multer" />
import { SOCIAL_TYPE } from '@shared/enums/enum';
export declare class UserInfoResDTO {
    private nickname;
    private socialType;
    private image;
    private regDate;
    private deletedAt;
    constructor(nickname: string, socialType: SOCIAL_TYPE, image: string, regDate: Date, deletedAt: Date | null);
}
export declare class UpdateUserReqDTO {
    nickname?: string;
    image?: Express.Multer.File;
}
export declare class GetCheckDuplicateUserNicknameReqDTO {
    nickname: string;
    constructor(nickname: string);
}
export declare class GetUserResDTO {
    private nickname;
    private socialType;
    private image;
    private regDate;
    constructor(nickname: string, socialType: SOCIAL_TYPE, image: string, regDate: Date);
}
