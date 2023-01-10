import { ApiResponseDTO } from '@shared/dto/response.dto';
import { GetListHotFeedResDTO } from 'src/api/home/dto/home.dto';
import { HomeService } from 'src/api/home/home.service';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getListHotFeed(): Promise<ApiResponseDTO<GetListHotFeedResDTO[]>>;
}
