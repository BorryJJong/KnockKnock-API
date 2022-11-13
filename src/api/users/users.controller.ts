import {User} from '@entities/User';
import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {UserValidator} from 'src/api/users/users.validator';
import {AuthService} from 'src/auth/auth.service';
import {JwtAuthGuard} from 'src/auth/jwt/jwt.guard';
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

      await this.authService.updateRefreshToken(user.id, refreshToken);
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

    await this.authService.updateRefreshToken(newUser.id, refreshToken);
    return new SocialLoginResponseDTO(
      false,
      new AuthInfoResponseDTO(accessToken, refreshToken),
    );
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '로그아웃',
    description: 'access_token을 활용해 회원 로그아웃',
  })
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
  })
  async logout(@Request() req): Promise<boolean> {
    const requestUser: User = req.user;
    const user = await this.userService.getUser(requestUser.id);
    await this.userService.logout(user.id);

    return true;
  }
}
