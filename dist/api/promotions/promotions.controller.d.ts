import { PromotionsService } from './promotions.service';
import { Promotions } from 'src/entities/Promotions';
import { ApiResponseDTO } from '@shared/dto/response.dto';
export declare class PromotionsController {
    private readonly promotionsService;
    constructor(promotionsService: PromotionsService);
    findAll(): Promise<ApiResponseDTO<Promotions[]>>;
}
