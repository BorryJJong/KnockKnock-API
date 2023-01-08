import { ApiResponseDTO } from '@shared/dto/response.dto';
import { MyPageService } from 'src/api/my-page/myPage.service';
import { IUser } from 'src/api/users/users.interface';
export declare class MyPageController {
    private readonly myPageService;
    constructor(myPageService: MyPageService);
    isLogin(user: IUser): Promise<ApiResponseDTO<boolean>>;
}
