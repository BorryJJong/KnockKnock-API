import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ConflictApiResponseDTO,
  DefaultErrorApiResponseDTO,
  InternalServerApiResponseDTO,
  OkApiResponseDTO,
  OkApiResponseNoneDataDTO,
  UnauthorizedApiResponseDTO,
} from '@shared/decorator/swagger.decorator';
import {UserDeco} from '@shared/decorator/user.decorator';
import {ApiResponseDTO, ErrorDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE, SOCIAL_TYPE} from '@shared/enums/enum';
import {
  PostFeedBlogPostHideReqDTO,
  PostFeedBlogPostReportReqBodyDTO,
  PostFeedBlogPostReportReqParamDTO,
} from 'src/api/feed/dto/feed.dto';
import {
  GetCheckDuplicateUserNicknameReqDTO,
  GetUserResDTO,
  UpdateUserReqDTO,
  UserInfoResDTO,
} from 'src/api/users/dto/users.dto';
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
  @OkApiResponseDTO(SocialLoginResponseDTO)
  @UnauthorizedApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async socialLogin(
    @Body() body: SocialLoginRequestDTO,
  ): Promise<ApiResponseDTO<SocialLoginResponseDTO | ErrorDTO>> {
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
          new UserInfoResDTO(
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
        const isExistUser = new SocialLoginResponseDTO(false);
        return new ApiResponseDTO<SocialLoginResponseDTO>(
          HttpStatus.OK,
          API_RESPONSE_MEESAGE.SUCCESS,
          isExistUser,
        );
      }
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Post('/sign-up')
  @ApiOperation({summary: '회원가입'})
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @OkApiResponseDTO(SocialLoginResponseDTO)
  @ConflictApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SignUpRequestDTO,
  ): Promise<ApiResponseDTO<SocialLoginResponseDTO | ErrorDTO>> {
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

      const newUser = await this.userService.saveUser(
        {
          socialType,
          socialUuid: userProperties.id.toString(),
          nickname,
        },
        file,
      );

      const {accessToken, refreshToken} = await this.authService.makeJwtToken(
        newUser.id,
      );

      await this.authService.updateRefreshToken(newUser.id, refreshToken);
      const result = new SocialLoginResponseDTO(
        false,
        new UserInfoResDTO(
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
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
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
  @OkApiResponseNoneDataDTO()
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async logout(
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      await this.userService.getUser(user.id);
      await this.userService.logout(user.id);
      return new ApiResponseDTO<void>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
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
  @OkApiResponseNoneDataDTO()
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async deleteUser(
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      const findeUser = await this.userService.getUserFindOrFail(user.id);
      await this.userService.deleteUser(
        findeUser.id,
        findeUser.socialUuid,
        findeUser.socialType === SOCIAL_TYPE.KAKAO,
      );

      return new ApiResponseDTO(HttpStatus.OK, API_RESPONSE_MEESAGE.SUCCESS);
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  // 추후에 multiton으로 수정
  private async getSocialLoginAttributes(
    socialType: SOCIAL_TYPE,
    socialUuid: string,
  ): Promise<IUserPropertiesResponse> {
    if (socialType === SOCIAL_TYPE.APPLE) {
      return await this.appleService.getUserProperties(socialUuid);
    } else {
      return await this.kakaoService.getUserProperties(socialUuid);
    }
  }

  @Put()
  @ApiOperation({summary: '회원 프로필 수정'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @OkApiResponseNoneDataDTO()
  @ConflictApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async profileUpdate(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserReqDTO: UpdateUserReqDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      const {nickname} = updateUserReqDTO;
      if (nickname) {
        await this.userValidator.checkDuplicateNickname(nickname);
      }

      await this.userService.profileUpdate(user.id, nickname, file);

      return new ApiResponseDTO<void>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get('/duplicate-nickname/:nickname')
  @ApiOperation({summary: '회원 닉네임 중복 확인'})
  @OkApiResponseDTO(Boolean, '닉네임 중복시 true, 아니면 false')
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async checkDuplicateNickname(
    @Param() param: GetCheckDuplicateUserNicknameReqDTO,
  ): Promise<ApiResponseDTO<boolean | ErrorDTO>> {
    try {
      const {nickname} = param;
      const isDuplicate = await this.userService.checkDuplicateNickname(
        nickname,
      );

      return new ApiResponseDTO<boolean>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        isDuplicate,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Post('/hide/blog-post/:id')
  @ApiOperation({summary: '피드 게시글 숨기기'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @OkApiResponseNoneDataDTO()
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async hideBlogPost(
    @Param() param: PostFeedBlogPostHideReqDTO,
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      const {id: postId} = param;
      await this.userService.hideBlogPost(user.id, postId);

      return new ApiResponseDTO<void>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get('/detail')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: '유저상세 조회'})
  @OkApiResponseDTO(GetUserResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async getUser(
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<GetUserResDTO | ErrorDTO>> {
    try {
      const getUser = new GetUserResDTO(
        user.nickname,
        user.socialType,
        user.image,
        user.regDate,
      );

      return new ApiResponseDTO<GetUserResDTO>(
        200,
        API_RESPONSE_MEESAGE.SUCCESS,
        getUser,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Post('/report/blog-post/:id')
  @ApiOperation({summary: '피드 게시글 신고하기'})
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async reportBlogPost(
    @UserDeco() user: IUser,
    @Param() param: PostFeedBlogPostReportReqParamDTO,
    @Body() body: PostFeedBlogPostReportReqBodyDTO,
  ): Promise<ApiResponseDTO<void>> {
    try {
      const {id: postId} = param;
      const {contents} = body;
      await this.userService.reportBlogPost(user.id, postId, contents);

      return new ApiResponseDTO<void>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
      );
    } catch (error) {
      return new ApiResponseDTO(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }
}
