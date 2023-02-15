import { Banner } from '@entities/Banner';
import { BANNER_TYPE } from '@shared/enums/enum';
import { IBanner, IBannerRepository } from 'src/api/home/interface/banner.interface';
import { Repository } from 'typeorm';
export declare class BannerRepository extends Repository<Banner> implements IBannerRepository {
    selectBanners(type: BANNER_TYPE): Promise<IBanner[]>;
}
