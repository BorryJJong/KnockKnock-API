import { BANNER_TYPE } from '@shared/enums/enum';
import { IBanner } from 'src/api/home/interface/banner.interface';
export declare class Banner implements IBanner {
    id: number;
    type: BANNER_TYPE;
    image: string;
    regDate: Date;
    exposeDate: Date;
    expireDate?: Date;
}
