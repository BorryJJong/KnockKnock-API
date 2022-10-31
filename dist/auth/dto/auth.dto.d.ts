import { SOCIAL_TYPE } from '@shared/enums/enum';
export declare class AuthInfoResponseDTO {
    private accessToken;
    private refreashToken;
    constructor(accessToken: string, refreashToken: string);
}
export declare class SocialLoginResponseDTO {
    private isExistUser;
    private authInfo?;
    constructor(isExistUser: boolean, authInfo?: AuthInfoResponseDTO);
}
export declare class SocialLoginRequestDTO {
    socialUuid: string;
    socialType: SOCIAL_TYPE;
}
export declare class SignUpRequestDTO extends SocialLoginRequestDTO {
    nickname: string;
    image: string;
}
export declare class SignUpResponseDTO {
    private authInfo;
    constructor(authInfo: AuthInfoResponseDTO);
}
