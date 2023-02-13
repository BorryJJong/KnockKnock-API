import {Banner} from '@entities/Banner';
import {Injectable} from '@nestjs/common';
import {BANNER_TYPE} from '@shared/enums/enum';
import {
  IBanner,
  IBannerRepository,
} from 'src/api/home/interface/banner.interface';
import {EntityRepository, Repository} from 'typeorm';

@Injectable()
@EntityRepository(Banner)
export class BannerRepository
  extends Repository<Banner>
  implements IBannerRepository
{
  async selectBanners(type: BANNER_TYPE): Promise<IBanner[]> {
    return await this.createQueryBuilder('banner')
      .where('banner.type = :type', {
        type,
      })
      .andWhere('banner.exposeDate <= NOW()')
      .andWhere('banner.expireDate >= NOW()')
      .orWhere('banner.expireDate IS NULL')
      .orderBy('banner.exposeDate', 'DESC')
      .getMany();
  }
}
