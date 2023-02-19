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
}
