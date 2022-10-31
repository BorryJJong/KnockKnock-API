import { SOCIAL_TYPE } from '@shared/enums/enum';
export declare class User {
    id: number;
    nickname: string;
    socialUuid: string;
    socialType: SOCIAL_TYPE;
    image: string;
    email?: string;
    serviceConnectionDate?: Date;
    regDate: Date;
    beforeInsert(): void;
}
