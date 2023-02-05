import { REPORT_TYPE } from '@shared/enums/enum';
export declare class UserReportBlogPost {
    id: number;
    userId: number;
    postId: number;
    reportType: REPORT_TYPE;
    regDate: Date;
}
