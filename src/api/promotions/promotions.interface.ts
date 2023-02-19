import {IPromotions} from '@entities/Promotions';

export interface IPromotionsRepository {
  selectPromotions(): Promise<IPromotions[]>;
  selectPromotionNames(ids: number[]): Promise<string[]>;
}
