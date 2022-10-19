import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {IUpdateUser} from 'src/api/users/users.repository';
import {AuthService} from 'src/auth/auth.service';
import {KakaoService} from 'src/auth/kakao.service';
import {
  AuthInfoResponseDTO,
  SignUpRequestDTO,
  SignUpResponseDTO,
  SocialLoginRequestDTO,
  SocialLoginResponseDTO,
} from '../../auth/dto/auth.dto';
import {GetUserRequestDTO, GetUserResponseDTO} from './dto/users.dto';
import {UsersService} from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly kakaoService: KakaoService,
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
  async signUp(@Body() body: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    const {nickName, image} = body;
    const id = 1;
    const user = await this.userService.getUserV2({id: id});
    const request: IUpdateUser = {
      nickName,
      image,
      id: user.id,
    };

    await this.userService.updateUser(request);

    return new SignUpResponseDTO(new AuthInfoResponseDTO('', ''));
  }

  @Get('/:id')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: '유저정보 조회'})
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetUserResponseDTO,
  })
  getUser(@Param() param: GetUserRequestDTO): Promise<GetUserResponseDTO> {
    return this.userService.getUserV2(param);
  }
}
