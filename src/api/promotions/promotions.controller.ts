import {Controller, Get, HttpStatus} from '@nestjs/common';
import {PromotionsService} from './promotions.service';
import {
  ApiDefaultResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {Promotions} from 'src/entities/Promotions';
import {ApiResponseDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';

@ApiTags('promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  @ApiOperation({summary: '프로모션 리스트'})
  @ApiOkResponse({
    description: '성공',
    type: [Promotions],
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  async findAll(): Promise<ApiResponseDTO<Promotions[]>> {
    try {
      const promotions = await this.promotionsService.findAll();

      return new ApiResponseDTO<Promotions[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        promotions,
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
