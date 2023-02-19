import { GetPromotionResDTO } from 'src/api/promotions/dto/promotions.dto';
import { IPromotionsRepository } from 'src/api/promotions/promotions.interface';
export declare class PromotionsService {
    private readonly promotionsRepository;
    constructor(promotionsRepository: IPromotionsRepository);
    getListPromotion(): Promise<GetPromotionResDTO[]>;
}
