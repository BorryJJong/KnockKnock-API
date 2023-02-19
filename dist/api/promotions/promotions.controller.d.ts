import { PromotionsService } from './promotions.service';
import { ApiResponseDTO, ErrorDTO } from '@shared/dto/response.dto';
import { GetPromotionResDTO } from 'src/api/promotions/dto/promotions.dto';
export declare class PromotionsController {
    private readonly promotionsService;
    constructor(promotionsService: PromotionsService);
    getListPromotion(): Promise<ApiResponseDTO<GetPromotionResDTO[] | ErrorDTO>>;
}
