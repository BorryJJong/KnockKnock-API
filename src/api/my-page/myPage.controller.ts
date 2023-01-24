import {Controller, Get, HttpStatus, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {
  DefaultErrorApiResponseDTO,
  InternalServerApiResponseDTO,
  OkApiResponseNoneDataDTO,
  UnauthorizedApiResponseDTO,
} from '@shared/decorator/swagger.decorator';
import {UserDeco} from '@shared/decorator/user.decorator';
import {ApiResponseDTO, ErrorDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';
import {MyPageService} from 'src/api/my-page/myPage.service';
import {IUser} from 'src/api/users/users.interface';
import {JwtGuard} from 'src/auth/jwt/jwt.guard';

@ApiTags('my-page')
@Controller('my-page')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class MyPageController {
  constructor(private readonly myPageService: MyPageService) {}

  @Get()
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
}
