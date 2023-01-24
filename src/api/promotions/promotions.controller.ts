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
  @ApiOperation({summary: '프로모션 리스트'})
  @OkApiResponseListDataDTO(GetPromotionResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  async findAll(): Promise<ApiResponseDTO<GetPromotionResDTO[] | ErrorDTO>> {
    try {
      const promotions = await this.promotionsService.findAll();

      return new ApiResponseDTO<GetPromotionResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        promotions.map(p => new GetPromotionResDTO(p.id, p.type)),
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
