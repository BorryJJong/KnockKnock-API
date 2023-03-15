import { BlogPostRepository } from 'src/api/feed/repository/blogPost.repository';
import { GetHomeListEventResDTO, GetHomeListVerifiredShopResDTO, GetListBannerReqQueryDTO, GetListBannerResDTO, GetListEventReqQueryDTO, GetListEventResDTO, GetListHotFeedResDTO, GetListVerifiredShopResDTO } from 'src/api/home/dto/home.dto';
import { IBannerRepository } from 'src/api/home/interface/banner.interface';
import { IEventRepository } from 'src/api/home/interface/event.interface';
import { IShopRepository } from 'src/api/home/interface/shop.interface';
import { ImageService } from 'src/api/image/image.service';
import { IPromotionsRepository } from 'src/api/promotions/promotions.interface';
export declare class HomeService {
    private readonly blogPostRepository;
    private readonly eventRepository;
    private readonly bannerRepository;
    private readonly shopRepository;
    private readonly promotionsRepository;
    private readonly imageService;
    constructor(blogPostRepository: BlogPostRepository, eventRepository: IEventRepository, bannerRepository: IBannerRepository, shopRepository: IShopRepository, promotionsRepository: IPromotionsRepository, imageService: ImageService);
    getListHotFeed(challengeId: number): Promise<GetListHotFeedResDTO[]>;
    getHomeListEvent(): Promise<GetHomeListEventResDTO[]>;
    private getIsNewBadge;
    private makeEventPeriod;
    getListEvent(query: GetListEventReqQueryDTO): Promise<GetListEventResDTO[]>;
    getListBanner(query: GetListBannerReqQueryDTO): Promise<GetListBannerResDTO[]>;
    getHomeListVerifiedShop(): Promise<GetHomeListVerifiredShopResDTO[]>;
    getListVerifiedShop(): Promise<GetListVerifiredShopResDTO[]>;
}
