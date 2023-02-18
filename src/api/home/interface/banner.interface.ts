import {BANNER_TYPE} from '@shared/enums/enum';

export interface IBannerRepository {
  selectBanners(type: BANNER_TYPE): Promise<IBanner[]>;
}

export interface IBanner {
  id: number;
  type: BANNER_TYPE;
  image: string;
  regDate: Date;
  exposeDate: Date;
  expireDate?: Date;
}
