import { SOCIAL_TYPE } from '@shared/enums/enum';
import { UserInfoResponseDTO } from 'src/api/users/dto/users.dto';
export declare class AuthInfoResponseDTO {
    private accessToken;
    private refreshToken;
    constructor(accessToken: string, refreshToken: string);
}
export declare class SocialLoginResponseDTO {
    private isExistUser;
    private userInfo?;
    private authInfo?;
    constructor(isExistUser: boolean, userInfo?: UserInfoResponseDTO, authInfo?: AuthInfoResponseDTO);
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
