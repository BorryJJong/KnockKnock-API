export declare const hashPassword: (password: string) => Promise<string>;
export declare const isComparePassword: (password: string, hash: string) => Promise<boolean>;
export declare const zeroFill: (n: number, num_length: number) => string;
export declare const dateFormat: (date: Date) => string;
export declare const convertTime: (utc: Date) => Date;
export declare const dateFormatV2: (targetDate: Date) => string;
export declare const convertTimeToStr: (t: Date) => string;
export declare const getCurrentPageCount: (page: number, take: number) => number;
export declare const isPageNext: (page: number, take: number, total: number) => boolean;
export declare const commafy: (num: number) => string;
export declare const dtoConvertBoolean: (value: any) => boolean;
export declare const stringIdsToArrayTransformer: {
    from(str: string): number[];
    to(ids: number[]): string;
};
