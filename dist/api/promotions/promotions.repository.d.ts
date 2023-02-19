import { Repository } from 'typeorm';
import { IPromotions, Promotions } from '@entities/Promotions';
import { IPromotionsRepository } from 'src/api/promotions/promotions.interface';
export declare class PromotionsRepository extends Repository<Promotions> implements IPromotionsRepository {
    selectPromotions(): Promise<IPromotions[]>;
    selectPromotionNames(ids: number[]): Promise<string[]>;
}
