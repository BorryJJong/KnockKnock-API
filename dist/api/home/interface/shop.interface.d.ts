import { IShop } from '@entities/Shop';
export interface IShopRepository {
    selectVerifiedShops(isHome: boolean): Promise<IShop[]>;
}
