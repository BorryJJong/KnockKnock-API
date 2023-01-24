export declare class ApiResponseDTO<T = void> {
    private code;
    private message;
    private data?;
    constructor(code: number, message: string, data?: T);
}
export declare class ErrorDTO {
    private code;
    private message;
}
export declare class NoneDataDTO {
    private code;
    private message;
}
