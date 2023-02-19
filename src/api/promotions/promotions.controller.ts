import {Controller, Get, HttpStatus} from '@nestjs/common';
import {PromotionsService} from './promotions.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {ApiResponseDTO, ErrorDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';
import {
  DefaultErrorApiResponseDTO,
  InternalServerApiResponseDTO,
  OkApiResponseListDataDTO,
} from '@shared/decorator/swagger.decorator';
import {GetPromotionResDTO} from 'src/api/promotions/dto/promotions.dto';

@ApiTags('promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  @ApiOperation({summary: '프로모션 목록'})
  @OkApiResponseListDataDTO(GetPromotionResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async getListPromotion(): Promise<
    ApiResponseDTO<GetPromotionResDTO[] | ErrorDTO>
  > {
    try {
      const promotions = await this.promotionsService.getListPromotion();

      return new ApiResponseDTO<GetPromotionResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        promotions,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
