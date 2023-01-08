import { API_RESPONSE_MEESAGE } from '@shared/enums/enum';
export declare class ApiResponseDTO<T = void> {
    private code;
    private message;
    private data?;
    constructor(code: number, message: API_RESPONSE_MEESAGE, data?: T);
}
