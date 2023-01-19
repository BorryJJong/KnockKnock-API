export declare class BlogPost {
    id: number;
    userId: number;
    content: string;
    storeAddress?: string;
    storeName?: string;
    locationX?: string;
    locationY?: string;
    scale: string;
    hits: number;
    modDate?: Date;
    hideCount: number;
    regDate: Date;
    delDate?: Date;
    beforeInsert(): void;
}
