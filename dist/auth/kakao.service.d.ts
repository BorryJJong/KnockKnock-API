export interface IUserPropertiesResponse {
    id: number;
}
export declare class KakaoService {
    private readonly adminKey;
    private readonly endPointV1;
    private readonly endPointV2;
    private readonly userMePath;
    private readonly logoutPath;
    private readonly unlinkPath;
    getUserProperties(kakaoToken: string): Promise<IUserPropertiesResponse>;
    logout(targetId: string, kakaoAdminKey: string): Promise<{
        statusCode: number;
        id: number;
    }>;
    unlink(targetId: string, kakaoAdminKey: string): Promise<{
        statusCode: number;
        id: number;
    }>;
}
