import {Controller, Get, HttpStatus, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {
  DefaultErrorApiResponseDTO,
  InternalServerApiResponseDTO,
  OkApiResponseListDataDTO,
} from '@shared/decorator/swagger.decorator';
import {ApiResponseDTO, ErrorDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';
import {
  GetHomeListEventResDTO,
  GetHomeListVerifiredShopResDTO,
  GetListBannerReqQueryDTO,
  GetListBannerResDTO,
  GetListEventReqQueryDTO,
  GetListEventResDTO,
  GetListHotFeedReqDTO,
  GetListHotFeedResDTO,
  GetListVerifiredShopResDTO,
} from 'src/api/home/dto/home.dto';
import {HomeService} from 'src/api/home/home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiTags('home')
  @Get('/hot-post')
  @ApiOperation({summary: '오늘의 인기 게시글'})
  @OkApiResponseListDataDTO(GetListHotFeedResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
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

  @ApiTags('home')
  @Get('/home-event')
  @ApiOperation({summary: '홈화면 특별한 이벤트 목록'})
  @OkApiResponseListDataDTO(GetHomeListEventResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async getHomeListEvent(): Promise<
    ApiResponseDTO<GetHomeListEventResDTO[] | ErrorDTO>
  > {
    try {
      const events = await this.homeService.getHomeListEvent();

      return new ApiResponseDTO<GetHomeListEventResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        events,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @ApiTags('home')
  @Get('/event')
  @ApiOperation({summary: '특별한 이벤트 목록 조회'})
  @OkApiResponseListDataDTO(GetListEventResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async getListEvent(
    @Query() query: GetListEventReqQueryDTO,
  ): Promise<ApiResponseDTO<GetListEventResDTO[] | ErrorDTO>> {
    try {
      const events = await this.homeService.getListEvent(query);

      return new ApiResponseDTO<GetListEventResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        events,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @ApiTags('home')
  @Get('/banner')
  @ApiOperation({summary: '배너 목록 조회'})
  @OkApiResponseListDataDTO(GetListBannerResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async getListBanner(
    @Query() query: GetListBannerReqQueryDTO,
  ): Promise<ApiResponseDTO<GetListBannerResDTO[] | ErrorDTO>> {
    try {
      const banners = await this.homeService.getListBanner(query);

      return new ApiResponseDTO<GetListBannerResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        banners,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @ApiTags('home')
  @Get('/home-verification-shop')
  @ApiOperation({summary: '홈화면 인증된 상점 목록 조회'})
  @OkApiResponseListDataDTO(GetHomeListVerifiredShopResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async getHomeListVerifiedShop(): Promise<
    ApiResponseDTO<GetHomeListVerifiredShopResDTO[] | ErrorDTO>
  > {
    try {
      const shops = await this.homeService.getHomeListVerifiedShop();

      return new ApiResponseDTO<GetHomeListVerifiredShopResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        shops,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @ApiTags('home')
  @Get('/verification-shop')
  @ApiOperation({summary: '인증된 상점 목록 조회'})
  @OkApiResponseListDataDTO(GetListVerifiredShopResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async getListVerifiedShop(): Promise<
    ApiResponseDTO<GetListVerifiredShopResDTO[] | ErrorDTO>
  > {
    try {
      const shops = await this.homeService.getListVerifiedShop();

      return new ApiResponseDTO<GetListVerifiredShopResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        shops,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
