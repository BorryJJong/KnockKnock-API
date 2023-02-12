import { ApiResponseDTO, ErrorDTO } from '@shared/dto/response.dto';
import { GetHomeListEventResDTO, GetListEventReqQueryDTO, GetListEventResDTO, GetListHotFeedReqDTO, GetListHotFeedResDTO } from 'src/api/home/dto/home.dto';
import { HomeService } from 'src/api/home/home.service';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getListHotFeed(query: GetListHotFeedReqDTO): Promise<ApiResponseDTO<GetListHotFeedResDTO[] | ErrorDTO>>;
    getHomeListEvent(): Promise<ApiResponseDTO<GetHomeListEventResDTO[] | ErrorDTO>>;
    getListEvent(query: GetListEventReqQueryDTO): Promise<ApiResponseDTO<GetListEventResDTO[] | ErrorDTO>>;
}
