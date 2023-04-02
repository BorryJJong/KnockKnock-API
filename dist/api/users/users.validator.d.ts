import { SOCIAL_TYPE } from '@shared/enums/enum';
import { IUserReportBlogPostRepository } from 'src/api/feed/interface/userReportBlogPost.interface';
import { IUserToBlockUserRepository } from 'src/api/users/interface/userToBlockUser.interface';
import { IUserRepository } from 'src/api/users/users.interface';
export declare class UserValidator {
    private userRepository;
    private userReportBlogPostRepository;
    private userToBlockUserRepository;
    constructor(userRepository: IUserRepository, userReportBlogPostRepository: IUserReportBlogPostRepository, userToBlockUserRepository: IUserToBlockUserRepository);
    checkExistSocialUser(socialUuid: string, socialType: SOCIAL_TYPE): Promise<void>;
    checkDuplicateNickname(nickname: string): Promise<void>;
    alreadyReportBlogPost(userId: number, postId: number): Promise<void>;
    alreadyBlockUser(userId: number, blockUserid: number): Promise<void>;
}
