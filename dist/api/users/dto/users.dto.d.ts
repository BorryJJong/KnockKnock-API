import { SOCIAL_TYPE } from '@shared/enums/enum';
export declare class UserInfoResponseDTO {
    private nickname;
    private socialType;
    private image;
    private regDate;
    private deletedAt?;
    constructor(nickname: string, socialType: SOCIAL_TYPE, image: string, regDate: Date, deletedAt?: Date);
}
