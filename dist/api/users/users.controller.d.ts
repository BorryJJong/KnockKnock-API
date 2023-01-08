import { ApiResponseDTO } from '@shared/dto/response.dto';
import { IUser } from 'src/api/users/users.interface';
import { UserValidator } from 'src/api/users/users.validator';
import { AppleService } from 'src/auth/apple.service';
import { AuthService } from 'src/auth/auth.service';
import { KakaoService } from 'src/auth/kakao.service';
import { SignUpRequestDTO, SocialLoginRequestDTO, SocialLoginResponseDTO } from '../../auth/dto/auth.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    private readonly userValidator;
    private readonly kakaoService;
    private readonly appleService;
    constructor(userService: UsersService, authService: AuthService, userValidator: UserValidator, kakaoService: KakaoService, appleService: AppleService);
    socialLogin(body: SocialLoginRequestDTO): Promise<ApiResponseDTO<SocialLoginResponseDTO | boolean>>;
    signUp(body: SignUpRequestDTO): Promise<ApiResponseDTO<SocialLoginResponseDTO>>;
    logout(user: IUser): Promise<ApiResponseDTO<boolean>>;
    deleteUser(user: IUser): Promise<ApiResponseDTO<boolean>>;
    private getSocialLoginAttributes;
}
