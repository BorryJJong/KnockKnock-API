import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {UserValidator} from 'src/api/users/users.validator';
import {AuthService} from 'src/auth/auth.service';
import {KakaoService} from 'src/auth/kakao.service';
import {
  AuthInfoResponseDTO,
  SignUpRequestDTO,
  SocialLoginRequestDTO,
  SocialLoginResponseDTO,
} from '../../auth/dto/auth.dto';
import {UsersService} from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly kakaoService: KakaoService,
    private readonly userValidator: UserValidator,
  ) {}

  @Post('/social-login')
  @ApiOperation({summary: '소셜 로그인'})
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증 에러',
  })
  async socialLogin(
    @Body() body: SocialLoginRequestDTO,
  ): Promise<SocialLoginResponseDTO> {
    const kakaoSocialUid = await this.kakaoService.getUserProperties(
      body.socialUuid,
    );

    const user = await this.userService.getSocialUser({
      socialUuid: kakaoSocialUid.id.toString(),
      socialType: SOCIAL_TYPE.KAKAO,
    });

    if (user) {
      const {accessToken, refreshToken} = await this.authService.makeJwtToken(
        user.id,
      );

      return new SocialLoginResponseDTO(
        true,
        new AuthInfoResponseDTO(accessToken, refreshToken),
      );
    } else {
      return new SocialLoginResponseDTO(false);
    }
  }

  @Post('/sign-up')
  @ApiOperation({summary: '회원가입'})
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  async signUp(
    @Body() body: SignUpRequestDTO,
  ): Promise<SocialLoginResponseDTO> {
    const {socialUuid, socialType, nickname} = body;
    const kakaoSocialUid = await this.kakaoService.getUserProperties(
      socialUuid,
    );

    await this.userValidator.checkExistSocialUser(
      kakaoSocialUid.id.toString(),
      socialType,
    );

    const newUser = await this.userService.saveUser({
      socialType,
      socialUuid: kakaoSocialUid.id.toString(),
      nickname,
    });
    const {accessToken, refreshToken} = await this.authService.makeJwtToken(
      newUser.id,
    );

    return new SocialLoginResponseDTO(
      false,
      new AuthInfoResponseDTO(accessToken, refreshToken),
    );
  }
}
