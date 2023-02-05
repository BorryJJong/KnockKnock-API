/// <reference types="multer" />
import { User } from '@entities/User';
import { IBlogPostRepository } from 'src/api/feed/interface/blogPost.interface';
import { UserToBlogPostHideRepository } from 'src/api/feed/repository/UserToBlogPostHide.repository';
import { ImageService } from 'src/api/image/image.service';
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
    private readonly kakaoService;
    private readonly imageService;
    private connection;
    constructor(userRepository: UserRepository, blogPostRepository: IBlogPostRepository, userToBlogPostHideRepository: UserToBlogPostHideRepository, kakaoService: KakaoService, imageService: ImageService, connection: Connection);
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
}
