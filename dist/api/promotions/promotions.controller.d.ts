import { PromotionsService } from './promotions.service';
import { Promotions } from 'src/entities/Promotions';
export declare class PromotionsController {
    private readonly promotionsService;
    constructor(promotionsService: PromotionsService);
    findAll(): Promise<Promotions[]>;
}
