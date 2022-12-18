import {User} from '@entities/User';
import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {UserValidator} from 'src/api/users/users.validator';
import {AppleService} from 'src/auth/apple.service';
import {IUserPropertiesResponse} from 'src/auth/auth.interface';
import {AuthService} from 'src/auth/auth.service';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';
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
    private readonly userValidator: UserValidator,
    private readonly kakaoService: KakaoService,
    private readonly appleService: AppleService,
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
    const {socialType, socialUuid} = body;
    const userProperties = await this.getSocialLoginAttributes(
      socialType,
      socialUuid,
    );

    const user = await this.userService.getSocialUser({
      socialUuid: userProperties.id.toString(),
      socialType,
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
    const userProperties = await this.getSocialLoginAttributes(
      socialType,
      socialUuid,
    );

    await this.userValidator.checkExistSocialUser(
      userProperties.id.toString(),
      socialType,
    );

    const newUser = await this.userService.saveUser({
      socialType,
      socialUuid: userProperties.id.toString(),
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
  @UseGuards(JwtGuard)
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

  @Delete('/')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '회원탈퇴',
    description: 'access_token을 활용해 회원 탈퇴',
  })
  @ApiResponse({
    status: 200,
    description: '회원탈퇴 성공',
  })
  async deleteUser(@Request() req): Promise<boolean> {
    const requestUser: User = req.user;
    const user = await this.userService.getUser(requestUser.id);
    await this.userService.deleteUser(user.id, user.socialUuid);

    return true;
  }

  private async getSocialLoginAttributes(
    socialType: SOCIAL_TYPE,
    socialUuid: string,
  ): Promise<IUserPropertiesResponse> {
    switch (socialType) {
      case SOCIAL_TYPE.APPLE:
        return await this.appleService.getUserProperties(socialUuid);
      case SOCIAL_TYPE.KAKAO:
        return await this.kakaoService.getUserProperties(socialUuid);
    }
  }
}
