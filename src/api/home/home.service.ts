import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BANNER_TYPE, EVENT_TAP} from '@shared/enums/enum';
import {dateFormatV2} from '@shared/utils';
import {isAfter, subDays} from 'date-fns';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {
  GetHomeListEventResDTO,
  GetListBannerReqQueryDTO,
  GetListBannerResDTO,
  GetListEventReqQueryDTO,
  GetListEventResDTO,
  GetListHotFeedResDTO,
} from 'src/api/home/dto/home.dto';
import {IBannerRepository} from 'src/api/home/interface/banner.interface';
import {IEventRepository} from 'src/api/home/interface/event.interface';
import {BannerRepository} from 'src/api/home/repository/Banner.Repository';
import {EventRepository} from 'src/api/home/repository/Event.Repository';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(BlogPostRepository)
    private readonly blogPostRepository: BlogPostRepository,
    @InjectRepository(EventRepository)
    private readonly eventRepository: IEventRepository,
    @InjectRepository(BannerRepository)
    private readonly bannerRepository: IBannerRepository,
  ) {}

  async getListHotFeed(challengeId: number): Promise<GetListHotFeedResDTO[]> {
    return this.blogPostRepository.selectBlogPostByHotFeeds(challengeId);
  }

  async getHomeListEvent(): Promise<GetHomeListEventResDTO[]> {
    const events = await this.eventRepository.selectEvents();
    return events.map(e => {
      return new GetHomeListEventResDTO(
        e.id,
        this.getIsNewBadge(e.regDate),
        e.title,
        this.makeEventPeriod(e.startDate, e.endDate),
        this.makeEventImageUrl(e.image),
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

  private makeEventImageUrl(imageUrl: string): string {
    return process.env.AWS_S3_ENDPOINT + `event/` + imageUrl;
  }

  async getListEvent(
    query: GetListEventReqQueryDTO,
  ): Promise<GetListEventResDTO[]> {
    const {eventTap} = query;
    const events = await this.eventRepository.selectEvents(eventTap);

    return events.map(e => {
      return new GetListEventResDTO(
        e.id,
        this.getIsNewBadge(e.regDate),
        query.eventTap === EVENT_TAP.END,
        e.title,
        this.makeEventPeriod(e.startDate, e.endDate),
        this.makeEventImageUrl(e.image),
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
      return new GetListBannerResDTO(b.id, b.image);
    });
  }
}
