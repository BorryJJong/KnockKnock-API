import {Injectable} from '@nestjs/common';
import {EntityRepository, Repository} from 'typeorm';
import {IPromotions, Promotions} from '@entities/Promotions';
import {IPromotionsRepository} from 'src/api/promotions/promotions.interface';

@Injectable()
@EntityRepository(Promotions)
export class PromotionsRepository
  extends Repository<Promotions>
  implements IPromotionsRepository
{
  async selectPromotions(): Promise<IPromotions[]> {
    return this.createQueryBuilder('promotions').getMany();
  }

  async selectPromotionNames(ids: number[]): Promise<string[]> {
    if (ids.length < 0) {
      return [];
    }

    return await this.createQueryBuilder('promotions')
      .select('promotions.type', 'name')
      .where('promotions.id IN (:...ids)', {
        ids,
      })
      .getRawMany()
      .then(names => names.map(n => n.name));
  }
}
