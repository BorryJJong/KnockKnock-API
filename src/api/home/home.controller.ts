import {Controller, Get, HttpStatus, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {
  DefaultErrorApiResponseDTO,
  OkApiResponseListDataDTO,
} from '@shared/decorator/swagger.decorator';
import {ApiResponseDTO, ErrorDTO} from '@shared/dto/response.dto';
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
  @OkApiResponseListDataDTO(GetListHotFeedResDTO)
  @DefaultErrorApiResponseDTO()
  async getListHotFeed(
    @Query() query: GetListHotFeedReqDTO,
  ): Promise<ApiResponseDTO<GetListHotFeedResDTO[] | ErrorDTO>> {
    try {
      const {challengeId} = query;
      const hotFeeds = await this.homeService.getListHotFeed(challengeId);

      return new ApiResponseDTO<GetListHotFeedResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        hotFeeds,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
