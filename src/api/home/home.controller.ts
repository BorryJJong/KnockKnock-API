import {Controller, Get, HttpStatus, Query} from '@nestjs/common';
import {
  ApiDefaultResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {ApiResponseDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';
import {
  GetListHotFeedReqDTO,
  GetListHotFeedResDTO,
} from 'src/api/home/dto/home.dto';
import {HomeService} from 'src/api/home/home.service';

@ApiTags('home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/hot-post')
  @ApiOperation({summary: '오늘의 인기 게시글'})
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetListHotFeedResDTO,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async getListHotFeed(
    @Query() query: GetListHotFeedReqDTO,
  ): Promise<ApiResponseDTO<GetListHotFeedResDTO[]>> {
    try {
      const {challengeId} = query;
      const hotFeeds = await this.homeService.getListHotFeed(challengeId);

      return new ApiResponseDTO<GetListHotFeedResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        hotFeeds,
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
