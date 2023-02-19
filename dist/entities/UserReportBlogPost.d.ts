import { REPORT_TYPE } from '@shared/enums/enum';
export interface IUserReportBlogPost {
    id: number;
    userId: number;
    postId: number;
    reportType: REPORT_TYPE;
    regDate: Date;
}
export declare class UserReportBlogPost implements IUserReportBlogPost {
    id: number;
    userId: number;
    postId: number;
    reportType: REPORT_TYPE;
    regDate: Date;
}
