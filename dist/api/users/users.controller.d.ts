import { UserValidator } from 'src/api/users/users.validator';
import { AuthService } from 'src/auth/auth.service';
import { KakaoService } from 'src/auth/kakao.service';
import { SignUpRequestDTO, SocialLoginRequestDTO, SocialLoginResponseDTO } from '../../auth/dto/auth.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    private readonly kakaoService;
    private readonly userValidator;
    constructor(userService: UsersService, authService: AuthService, kakaoService: KakaoService, userValidator: UserValidator);
    socialLogin(body: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO>;
    signUp(body: SignUpRequestDTO): Promise<SocialLoginResponseDTO>;
    logout(req: any): Promise<boolean>;
    deleteUser(req: any): Promise<boolean>;
}
