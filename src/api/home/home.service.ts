import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EVENT_TAP} from '@shared/enums/enum';
import {dateFormatV2} from '@shared/utils';
import {isAfter, subDays} from 'date-fns';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {
  GetHomeListEventResDTO,
  GetListEventReqQueryDTO,
  GetListEventResDTO,
  GetListHotFeedResDTO,
} from 'src/api/home/dto/home.dto';
import {IEventRepository} from 'src/api/home/interface/event.interface';
import {EventRepository} from 'src/api/home/repository/Event.Repository';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(BlogPostRepository)
    private readonly blogPostRepository: BlogPostRepository,
    @InjectRepository(EventRepository)
    private readonly eventRepository: IEventRepository,
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
}
