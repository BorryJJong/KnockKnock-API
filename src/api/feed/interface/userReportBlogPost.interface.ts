import {REPORT_TYPE} from '@shared/enums/enum';

export interface IUserReportBlogPostRepository {
  insertUserReportBlogPost(
    userId: number,
    postId: number,
    reportType: REPORT_TYPE,
  ): Promise<void>;

  selectUserReportBlogPostByUser(
    userId: number,
    postId: number,
  ): Promise<number | undefined>;
}
