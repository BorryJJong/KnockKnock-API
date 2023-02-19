import {IShop, Shop} from '@entities/Shop';
import {Injectable} from '@nestjs/common';
import {IShopRepository} from 'src/api/home/interface/shop.interface';
import {EntityRepository, Repository} from 'typeorm';

@Injectable()
@EntityRepository(Shop)
export class ShopRepository
  extends Repository<Shop>
  implements IShopRepository
{
  async selectVerifiedShops(isHome: boolean): Promise<IShop[]> {
    return await this.createQueryBuilder('shop')
      .where('shop.verifiedDate IS NOT NULL')
      .orderBy('shop.verifiedDate', 'DESC')
      .limit(isHome ? 5 : undefined)
      .getMany();
  }
}
