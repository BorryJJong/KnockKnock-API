import { ERRPR_CODE } from '@shared/enums/enum';
export declare class ErrorTemplate {
    id: number;
    errorCode: ERRPR_CODE;
    errorMessage: string;
    statusCode: number;
    modDate: Date;
    beforeInsert(): void;
}
