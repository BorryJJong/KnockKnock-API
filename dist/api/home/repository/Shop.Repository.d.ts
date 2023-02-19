import { IShop, Shop } from '@entities/Shop';
import { IShopRepository } from 'src/api/home/interface/shop.interface';
import { Repository } from 'typeorm';
export declare class ShopRepository extends Repository<Shop> implements IShopRepository {
    selectVerifiedShops(isHome: boolean): Promise<IShop[]>;
}
