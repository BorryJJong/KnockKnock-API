import { Promotions } from 'src/entities/Promotions';
import { Repository } from 'typeorm';
export declare class PromotionsService {
    private promotionsRepository;
    constructor(promotionsRepository: Repository<Promotions>);
    findAll(): Promise<Promotions[]>;
}
