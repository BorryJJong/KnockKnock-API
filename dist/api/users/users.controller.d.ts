/// <reference types="multer" />
import { ApiResponseDTO, ErrorDTO } from '@shared/dto/response.dto';
import { PostFeedBlogPostHideReqDTO, ReportBlogPostReqBodyDTO, ReportBlogPostReqParamDTO } from 'src/api/feed/dto/feed.dto';
import { BlockUserParamDTO, GetCheckDuplicateUserNicknameReqDTO, GetUserResDTO, UpdateUserReqDTO } from 'src/api/users/dto/users.dto';
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
    socialLogin(body: SocialLoginRequestDTO): Promise<ApiResponseDTO<SocialLoginResponseDTO | ErrorDTO>>;
    signUp(file: Express.Multer.File, body: SignUpRequestDTO): Promise<ApiResponseDTO<SocialLoginResponseDTO | ErrorDTO>>;
    logout(user: IUser): Promise<ApiResponseDTO<void | ErrorDTO>>;
    deleteUser(user: IUser): Promise<ApiResponseDTO<void | ErrorDTO>>;
    private getSocialLoginAttributes;
    profileUpdate(file: Express.Multer.File, updateUserReqDTO: UpdateUserReqDTO, user: IUser): Promise<ApiResponseDTO<void | ErrorDTO>>;
    checkDuplicateNickname(param: GetCheckDuplicateUserNicknameReqDTO): Promise<ApiResponseDTO<boolean | ErrorDTO>>;
    hideBlogPost(param: PostFeedBlogPostHideReqDTO, user: IUser): Promise<ApiResponseDTO<void | ErrorDTO>>;
    getUser(user: IUser): Promise<ApiResponseDTO<GetUserResDTO | ErrorDTO>>;
    reportBlogPost(user: IUser, param: ReportBlogPostReqParamDTO, body: ReportBlogPostReqBodyDTO): Promise<ApiResponseDTO<void | ErrorDTO>>;
    blockUser(user: IUser, param: BlockUserParamDTO): Promise<ApiResponseDTO<void | ErrorDTO>>;
}
