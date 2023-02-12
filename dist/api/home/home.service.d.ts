import { BlogPostRepository } from 'src/api/feed/repository/blogPost.repository';
import { GetHomeListEventResDTO, GetListEventReqQueryDTO, GetListEventResDTO, GetListHotFeedResDTO } from 'src/api/home/dto/home.dto';
import { IEventRepository } from 'src/api/home/interface/event.interface';
export declare class HomeService {
    private readonly blogPostRepository;
    private readonly eventRepository;
    constructor(blogPostRepository: BlogPostRepository, eventRepository: IEventRepository);
    getListHotFeed(challengeId: number): Promise<GetListHotFeedResDTO[]>;
    getHomeListEvent(): Promise<GetHomeListEventResDTO[]>;
    private getIsNewBadge;
    private makeEventPeriod;
    private makeEventImageUrl;
    getListEvent(query: GetListEventReqQueryDTO): Promise<GetListEventResDTO[]>;
}
