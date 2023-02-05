import { SOCIAL_TYPE } from '@shared/enums/enum';
import { IUserReportBlogPostRepository } from 'src/api/feed/interface/userReportBlogPost.interface';
import { IUserRepository } from 'src/api/users/users.interface';
export declare class UserValidator {
    private userRepository;
    private userReportBlogPostRepository;
    constructor(userRepository: IUserRepository, userReportBlogPostRepository: IUserReportBlogPostRepository);
    checkExistSocialUser(socialUuid: string, socialType: SOCIAL_TYPE): Promise<void>;
    checkDuplicateNickname(nickname: string): Promise<void>;
    alreadyReportBlogPost(userId: number, postId: number): Promise<void>;
}
