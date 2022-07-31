export declare const hashPassword: (password: string) => Promise<string>;
export declare const isComparePassword: (password: string, hash: string) => Promise<boolean>;
export declare const zeroFill: (n: number, num_length: number) => string;
export declare const dateFormat: (date: Date) => string;
export declare const convertTime: (utc: Date) => Date;
export declare const convertTimeToStr: (t: Date) => string;
