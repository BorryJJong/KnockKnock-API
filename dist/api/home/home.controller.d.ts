import { ApiResponseDTO } from '@shared/dto/response.dto';
import { GetListHotFeedReqDTO, GetListHotFeedResDTO } from 'src/api/home/dto/home.dto';
import { HomeService } from 'src/api/home/home.service';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getListHotFeed(query: GetListHotFeedReqDTO): Promise<ApiResponseDTO<GetListHotFeedResDTO[]>>;
}
