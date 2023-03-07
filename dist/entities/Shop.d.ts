export interface IShop {
    id: number;
    name: string;
    description: string;
    image: string;
    url: string;
    promotionIds: number[];
    regDate: Date;
    delDate?: Date;
    verifiedDate: Date;
    locationX: string;
    locationY: string;
}
export declare class Shop implements IShop {
    id: number;
    name: string;
    description: string;
    image: string;
    url: string;
    promotionIds: number[];
    regDate: Date;
    delDate?: Date;
    verifiedDate: Date;
    locationX: string;
    locationY: string;
}
