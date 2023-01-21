import {Controller, Get, HttpStatus, UseGuards} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {UserDeco} from '@shared/decorator/user.decorator';
import {ApiResponseDTO} from '@shared/dto/response.dto';
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
  @ApiResponse({
    status: 200,
    description: '성공',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: '회원탈퇴유저',
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async isLogin(@UserDeco() user: IUser): Promise<ApiResponseDTO<boolean>> {
    try {
      await this.myPageService.isLogin(user.id);

      return new ApiResponseDTO<boolean>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
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
}
