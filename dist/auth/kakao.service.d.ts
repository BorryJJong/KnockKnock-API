import { IUserPropertiesResponse } from 'src/auth/auth.interface';
export declare class KakaoService {
    private readonly adminKey;
    private readonly endPointV1;
    private readonly endPointV2;
    private readonly userMePath;
    private readonly unlinkPath;
    getUserProperties(kakaoToken: string): Promise<IUserPropertiesResponse>;
    unlink(socialUuid: string): Promise<{
        statusCode: number;
        id: number;
    }>;
}
