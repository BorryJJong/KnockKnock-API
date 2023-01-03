import {Controller, Get, UseGuards} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {UserDeco} from '@shared/decorator/user.decorator';
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
  async isLogin(@UserDeco() user: IUser): Promise<boolean> {
    return this.myPageService.isLogin(user.id);
  }
}
