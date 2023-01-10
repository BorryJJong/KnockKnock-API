import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {UserDeco} from '@shared/decorator/user.decorator';
import {ApiResponseDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE, SOCIAL_TYPE} from '@shared/enums/enum';
import {UserInfoResponseDTO} from 'src/api/users/dto/users.dto';
import {IUser} from 'src/api/users/users.interface';
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
    type: SocialLoginResponseDTO,
  })
  @ApiResponse({
    status: 200,
    description: '회원가입필요 여부',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: '인증 에러',
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async socialLogin(
    @Body() body: SocialLoginRequestDTO,
  ): Promise<ApiResponseDTO<SocialLoginResponseDTO | boolean>> {
    try {
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

        const result = new SocialLoginResponseDTO(
          true,
          new UserInfoResponseDTO(
            user.nickname,
            user.socialType,
            user.image,
            user.regDate,
            user.deletedAt,
          ),
          new AuthInfoResponseDTO(accessToken, refreshToken),
        );

        return new ApiResponseDTO<SocialLoginResponseDTO>(
          HttpStatus.OK,
          API_RESPONSE_MEESAGE.SUCCESS,
          result,
        );
      } else {
        return new ApiResponseDTO<boolean>(
          HttpStatus.OK,
          API_RESPONSE_MEESAGE.SUCCESS,
          false,
        );
      }
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Post('/sign-up')
  @ApiOperation({summary: '회원가입'})
  @ApiResponse({
    status: 200,
    description: '성공',
    type: SocialLoginResponseDTO,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async signUp(
    @Body() body: SignUpRequestDTO,
  ): Promise<ApiResponseDTO<SocialLoginResponseDTO>> {
    try {
      const {socialUuid, socialType, nickname} = body;
      const userProperties = await this.getSocialLoginAttributes(
        socialType,
        socialUuid,
      );

      await this.userValidator.checkExistSocialUser(
        userProperties.id.toString(),
        socialType,
      );
      await this.userValidator.checkDuplicateNickname(nickname);

      const newUser = await this.userService.saveUser({
        socialType,
        socialUuid: userProperties.id.toString(),
        nickname,
      });

      const {accessToken, refreshToken} = await this.authService.makeJwtToken(
        newUser.id,
      );

      await this.authService.updateRefreshToken(newUser.id, refreshToken);
      const result = new SocialLoginResponseDTO(
        false,
        new UserInfoResponseDTO(
          newUser.nickname,
          newUser.socialType,
          newUser.image,
          newUser.regDate,
          newUser.deletedAt,
        ),
        new AuthInfoResponseDTO(accessToken, refreshToken),
      );

      return new ApiResponseDTO<SocialLoginResponseDTO>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        result,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
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
    type: Boolean,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async logout(@UserDeco() user: IUser): Promise<ApiResponseDTO<boolean>> {
    try {
      await this.userService.getUser(user.id);
      await this.userService.logout(user.id);
      return new ApiResponseDTO<boolean>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        true,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
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
    type: Boolean,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async deleteUser(@UserDeco() user: IUser): Promise<ApiResponseDTO<boolean>> {
    try {
      const findeUser = await this.userService.getUser(user.id);
      await this.userService.deleteUser(
        findeUser.id,
        findeUser.socialUuid,
        findeUser.socialType === SOCIAL_TYPE.KAKAO,
      );

      return new ApiResponseDTO(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        true,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  // 추후에 multiton으로 수정
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
