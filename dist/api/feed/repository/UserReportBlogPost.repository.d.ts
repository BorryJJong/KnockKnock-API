import { Repository } from 'typeorm';
import { UserReportBlogPost } from '@entities/UserReportBlogPost';
import { REPORT_TYPE } from '@shared/enums/enum';
export declare class UserReportBlogPostRepository extends Repository<UserReportBlogPost> {
    insertUserReportBlogPost(userId: number, postId: number, reportType: REPORT_TYPE): Promise<void>;
    selectUserReportBlogPostByUser(userId: number, postId: number): Promise<number | undefined>;
}
