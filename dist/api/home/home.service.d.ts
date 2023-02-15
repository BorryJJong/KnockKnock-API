import { BlogPostRepository } from 'src/api/feed/repository/blogPost.repository';
import { GetHomeListEventResDTO, GetListBannerReqQueryDTO, GetListBannerResDTO, GetListEventReqQueryDTO, GetListEventResDTO, GetListHotFeedResDTO } from 'src/api/home/dto/home.dto';
import { IBannerRepository } from 'src/api/home/interface/banner.interface';
import { IEventRepository } from 'src/api/home/interface/event.interface';
export declare class HomeService {
    private readonly blogPostRepository;
    private readonly eventRepository;
    private readonly bannerRepository;
    constructor(blogPostRepository: BlogPostRepository, eventRepository: IEventRepository, bannerRepository: IBannerRepository);
    getListHotFeed(challengeId: number): Promise<GetListHotFeedResDTO[]>;
    getHomeListEvent(): Promise<GetHomeListEventResDTO[]>;
    private getIsNewBadge;
    private makeEventPeriod;
    private makeEventImageUrl;
    getListEvent(query: GetListEventReqQueryDTO): Promise<GetListEventResDTO[]>;
    getListBanner(query: GetListBannerReqQueryDTO): Promise<GetListBannerResDTO[]>;
}
