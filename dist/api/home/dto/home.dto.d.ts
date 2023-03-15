import { BANNER_TARGET_SCREEN, BANNER_TYPE, EVENT_TAP } from '@shared/enums/enum';
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
    private image;
    constructor(id: number, isNewBadge: boolean, title: string, eventPeriod: string, image: string);
}
export declare class GetListEventResDTO {
    private id;
    private isNewBadge;
    private isEndEvent;
    private title;
    private eventPeriod;
    private image;
    private url;
    constructor(id: number, isNewBadge: boolean, isEndEvent: boolean, title: string, eventPeriod: string, image: string, url: string);
}
export declare class GetListEventReqQueryDTO {
    eventTap: EVENT_TAP;
}
export declare class GetListBannerReqQueryDTO {
    bannerType: BANNER_TYPE;
}
export declare class GetListBannerResDTO {
    private id;
    private image;
    private type;
    private targetScreen?;
    constructor(id: number, image: string, type: BANNER_TYPE, targetScreen?: BANNER_TARGET_SCREEN);
}
export declare class GetHomeListVerifiredShopResDTO {
    private name;
    private description;
    private image;
    private shopPromotionNames;
    constructor(name: string, description: string, image: string, shopPromotionNames: string[]);
}
export declare class GetListVerifiredShopResDTO {
    private id;
    private name;
    private description;
    private image;
    private shopPromotionNames;
    private url;
    locationX: string;
    locationY: string;
    constructor(id: number, name: string, description: string, image: string, shopPromotionNames: string[], url: string, locationX: string, locationY: string);
}
