import { EVENT_TAP } from '@shared/enums/enum';
export declare class GetListHotFeedResDTO {
    private postId;
    private scale;
    private nickname;
    private fileUrl;
    constructor(postId: number, scale: string, nickname: string, fileUrl: string);
}
export declare class GetListHotFeedReqDTO {
    challengeId: number;
    constructor(challengeId: number);
}
export declare class GetHomeListEventResDTO {
    private id;
    private isNewBadge;
    private title;
    private eventPeriod;
    image: string;
    constructor(id: number, isNewBadge: boolean, title: string, eventPeriod: string, image: string);
}
export declare class GetListEventResDTO {
    private id;
    private isNewBadge;
    private isEndEvent;
    private title;
    private eventPeriod;
    image: string;
    url: string;
    constructor(id: number, isNewBadge: boolean, isEndEvent: boolean, title: string, eventPeriod: string, image: string, url: string);
}
export declare class GetListEventReqQueryDTO {
    eventTap: EVENT_TAP;
}
