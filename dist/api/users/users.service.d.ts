/// <reference types="multer" />
import { User } from '@entities/User';
import { UserToBlockUser } from '@entities/UserToBlockUser';
import { REPORT_TYPE } from '@shared/enums/enum';
import { IBlogPostRepository } from 'src/api/feed/interface/blogPost.interface';
import { UserReportBlogPostRepository } from 'src/api/feed/repository/UserReportBlogPost.repository';
import { UserToBlogPostHideRepository } from 'src/api/feed/repository/UserToBlogPostHide.repository';
import { ImageService } from 'src/api/image/image.service';
import { IUserToBlockUserRepository } from 'src/api/users/interface/userToBlockUser.interface';
import { ICreateUser } from 'src/api/users/users.interface';
import { SocialLoginRequestDTO } from 'src/auth/dto/auth.dto';
import { KakaoService } from 'src/auth/kakao.service';
import { Connection } from 'typeorm';
import { UserRepository } from './users.repository';
export interface test {
    nickname: string | null;
    fileUrl?: string;
}
export declare class UsersService {
    private readonly userRepository;
    private readonly blogPostRepository;
    private readonly userToBlogPostHideRepository;
    private readonly userReportBlogPostRepository;
    private readonly userToBlockUserRepository;
    private readonly kakaoService;
    private readonly imageService;
    private connection;
    constructor(userRepository: UserRepository, blogPostRepository: IBlogPostRepository, userToBlogPostHideRepository: UserToBlogPostHideRepository, userReportBlogPostRepository: UserReportBlogPostRepository, userToBlockUserRepository: IUserToBlockUserRepository, kakaoService: KakaoService, imageService: ImageService, connection: Connection);
    saveUser(request: ICreateUser, file: Express.Multer.File): Promise<User>;
    getSocialUser({ socialUuid, socialType, }: SocialLoginRequestDTO): Promise<User | undefined>;
    getUser(userId: number): Promise<User | undefined>;
    getUserFindOrFail(userId: number): Promise<User>;
    logout(userId: number): Promise<void>;
    deleteUser(userId: number, socialUuid: string, isKakao: boolean): Promise<void>;
    profileUpdate(userId: number, nickname?: string, file?: Express.Multer.File): Promise<void>;
    getUserProfileImageUrl(file: Express.Multer.File): Promise<string>;
    checkDuplicateNickname(nickname: string): Promise<boolean>;
    hideBlogPost(userId: number, postId: number): Promise<void>;
    reportBlogPost(userId: number, postId: number, reportType: REPORT_TYPE): Promise<void>;
    blockUser(userId: number, blockUserId: number): Promise<void>;
    unblockUser(userId: number, blockUserId: number): Promise<void>;
    getExcludeBockUsers(userIds: number[]): Promise<UserToBlockUser[]>;
}
