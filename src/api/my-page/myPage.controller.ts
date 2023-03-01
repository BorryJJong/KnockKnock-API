import {Controller, Get, HttpStatus, Param, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {
  DefaultErrorApiResponseDTO,
  InternalServerApiResponseDTO,
  OkApiResponseDTO,
  OkApiResponseListDataDTO,
  OkApiResponseNoneDataDTO,
  UnauthorizedApiResponseDTO,
} from '@shared/decorator/swagger.decorator';
import {UserDeco} from '@shared/decorator/user.decorator';
import {ApiResponseDTO, ErrorDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';
import {
  GetListNoticeResDTO,
  GetNoticeReqDTO,
  GetNoticeResDTO,
} from 'src/api/my-page/dto/notice.dto';
import {MyPageService} from 'src/api/my-page/myPage.service';
import {IUser} from 'src/api/users/users.interface';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';

@ApiTags('my-page')
@Controller()
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class MyPageController {
  constructor(private readonly myPageService: MyPageService) {}

  @Get('/my-page')
  @ApiOperation({
    summary: '마이페이지 화면 구성(로그인 or 로그아웃/회원탈퇴 확인)',
  })
  @UnauthorizedApiResponseDTO()
  @OkApiResponseNoneDataDTO()
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async isLogin(
    @UserDeco() user: IUser,
  ): Promise<ApiResponseDTO<void | ErrorDTO>> {
    try {
      await this.myPageService.isLogin(user.id);

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

  @Get('/notice')
  @ApiOperation({
    summary: '공지사항 목록',
  })
  @OkApiResponseListDataDTO(GetListNoticeResDTO)
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  async getListNotice(): Promise<
    ApiResponseDTO<GetListNoticeResDTO[] | ErrorDTO>
  > {
    try {
      const notices = await this.myPageService.getListNotice();

      return new ApiResponseDTO<GetListNoticeResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        notices,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get('/notice/:id')
  @ApiOperation({
    summary: '공지사항 상세',
  })
  @OkApiResponseDTO(GetNoticeResDTO)
  @InternalServerApiResponseDTO()
  @DefaultErrorApiResponseDTO()
  async getNotice(
    @Param() param: GetNoticeReqDTO,
  ): Promise<ApiResponseDTO<GetNoticeResDTO | ErrorDTO>> {
    try {
      const notice = await this.myPageService.getNotice(param.id);

      return new ApiResponseDTO<GetNoticeResDTO>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        notice,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
