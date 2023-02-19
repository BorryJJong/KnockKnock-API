import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EVENT_TAP} from '@shared/enums/enum';
import {dateFormatV2} from '@shared/utils';
import {isAfter, subDays} from 'date-fns';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {
  GetHomeListEventResDTO,
  GetHomeListVerifiredShopResDTO,
  GetListBannerReqQueryDTO,
  GetListBannerResDTO,
  GetListEventReqQueryDTO,
  GetListEventResDTO,
  GetListHotFeedResDTO,
  GetListVerifiredShopResDTO,
} from 'src/api/home/dto/home.dto';
import {IBannerRepository} from 'src/api/home/interface/banner.interface';
import {IEventRepository} from 'src/api/home/interface/event.interface';
import {IShopRepository} from 'src/api/home/interface/shop.interface';
import {BannerRepository} from 'src/api/home/repository/Banner.Repository';
import {EventRepository} from 'src/api/home/repository/Event.Repository';
import {ShopRepository} from 'src/api/home/repository/Shop.Repository';
import {IPromotionsRepository} from 'src/api/promotions/promotions.interface';
import {PromotionsRepository} from 'src/api/promotions/promotions.repository';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(BlogPostRepository)
    private readonly blogPostRepository: BlogPostRepository,
    @InjectRepository(EventRepository)
    private readonly eventRepository: IEventRepository,
    @InjectRepository(BannerRepository)
    private readonly bannerRepository: IBannerRepository,
    @InjectRepository(ShopRepository)
    private readonly shopRepository: IShopRepository,
    @InjectRepository(PromotionsRepository)
    private readonly promotionsRepository: IPromotionsRepository,
  ) {}

  async getListHotFeed(challengeId: number): Promise<GetListHotFeedResDTO[]> {
    return this.blogPostRepository.selectBlogPostByHotFeeds(challengeId);
  }

  async getHomeListEvent(): Promise<GetHomeListEventResDTO[]> {
    const events = await this.eventRepository.selectEvents(true);
    return events.map(e => {
      return new GetHomeListEventResDTO(
        e.id,
        this.getIsNewBadge(e.regDate),
        e.title,
        this.makeEventPeriod(e.startDate, e.endDate),
        this.makeImageUrl('event', e.image),
      );
    });
  }

  private getIsNewBadge(regDate: Date): boolean {
    return isAfter(regDate, subDays(new Date(), 14));
  }

  private makeEventPeriod(startDate: Date, endDate?: Date): string {
    return `${dateFormatV2(startDate)} ~ ${
      endDate ? dateFormatV2(endDate) : '미정'
    }`;
  }

  async getListEvent(
    query: GetListEventReqQueryDTO,
  ): Promise<GetListEventResDTO[]> {
    const {eventTap} = query;
    const events = await this.eventRepository.selectEvents(false, eventTap);

    return events.map(e => {
      return new GetListEventResDTO(
        e.id,
        this.getIsNewBadge(e.regDate),
        query.eventTap === EVENT_TAP.END,
        e.title,
        this.makeEventPeriod(e.startDate, e.endDate),
        this.makeImageUrl('event', e.image),
        e.url,
      );
    });
  }

  async getListBanner(
    query: GetListBannerReqQueryDTO,
  ): Promise<GetListBannerResDTO[]> {
    const {bannerType} = query;
    const banners = await this.bannerRepository.selectBanners(bannerType);

    return banners.map(b => {
      return new GetListBannerResDTO(b.id, b.image, b.type);
    });
  }

  async getHomeListVerifiedShop(): Promise<GetHomeListVerifiredShopResDTO[]> {
    const shops = await this.shopRepository.selectVerifiedShops(true);
    return Promise.all(
      shops.map(async s => {
        const shopPromotionNames =
          await this.promotionsRepository.selectPromotionNames(s.promotionIds);
        return new GetHomeListVerifiredShopResDTO(
          s.name,
          s.description,
          s.image,
          shopPromotionNames,
        );
      }),
    );
  }

  async getListVerifiedShop(): Promise<GetListVerifiredShopResDTO[]> {
    const shops = await this.shopRepository.selectVerifiedShops(false);
    return Promise.all(
      shops.map(async s => {
        const shopPromotionNames =
          await this.promotionsRepository.selectPromotionNames(s.promotionIds);
        return new GetListVerifiredShopResDTO(
          s.id,
          s.name,
          s.description,
          this.makeImageUrl('shop', s.image),
          shopPromotionNames,
          s.url,
        );
      }),
    );
  }

  private makeImageUrl(object: string, imageUrl: string): string {
    return process.env.AWS_S3_ENDPOINT + object + `/` + imageUrl;
  }
}
