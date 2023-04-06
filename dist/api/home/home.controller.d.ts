import { ApiResponseDTO, ErrorDTO } from '@shared/dto/response.dto';
import { GetHomeListEventResDTO, GetHomeListVerifiredShopResDTO, GetListBannerReqQueryDTO, GetListBannerResDTO, GetListEventReqQueryDTO, GetListEventResDTO, GetListHotFeedReqDTO, GetListHotFeedResDTO, GetListVerifiredShopResDTO } from 'src/api/home/dto/home.dto';
import { HomeService } from 'src/api/home/home.service';
import { IUser } from 'src/api/users/users.interface';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getListHotFeed(user: IUser, query: GetListHotFeedReqDTO): Promise<ApiResponseDTO<GetListHotFeedResDTO[] | ErrorDTO>>;
    getHomeListEvent(): Promise<ApiResponseDTO<GetHomeListEventResDTO[] | ErrorDTO>>;
    getListEvent(query: GetListEventReqQueryDTO): Promise<ApiResponseDTO<GetListEventResDTO[] | ErrorDTO>>;
    getListBanner(query: GetListBannerReqQueryDTO): Promise<ApiResponseDTO<GetListBannerResDTO[] | ErrorDTO>>;
    getHomeListVerifiedShop(): Promise<ApiResponseDTO<GetHomeListVerifiredShopResDTO[] | ErrorDTO>>;
    getListVerifiedShop(): Promise<ApiResponseDTO<GetListVerifiredShopResDTO[] | ErrorDTO>>;
}
