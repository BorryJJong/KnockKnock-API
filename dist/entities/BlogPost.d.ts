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
    regDate: Date;
    delDate?: Date;
    isDeleted: boolean;
    beforeInsert(): void;
}
