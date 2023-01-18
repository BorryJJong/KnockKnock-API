/// <reference types="multer" />
import { User } from '@entities/User';
import { ImageService } from 'src/api/image/image.service';
import { UpdateUserReqDTO } from 'src/api/users/dto/users.dto';
import { ICreateUser } from 'src/api/users/users.interface';
import { SocialLoginRequestDTO } from 'src/auth/dto/auth.dto';
import { KakaoService } from 'src/auth/kakao.service';
import { Connection } from 'typeorm';
import { UserRepository } from './users.repository';
export declare class UsersService {
    private readonly userRepository;
    private readonly kakaoService;
    private readonly imageService;
    private connection;
    constructor(userRepository: UserRepository, kakaoService: KakaoService, imageService: ImageService, connection: Connection);
    saveUser(request: ICreateUser, file: Express.Multer.File): Promise<User>;
    getSocialUser({ socialUuid, socialType, }: SocialLoginRequestDTO): Promise<User | undefined>;
    getUser(userId: number): Promise<User | undefined>;
    getUserFindOrFail(userId: number): Promise<User>;
    logout(userId: number): Promise<void>;
    deleteUser(userId: number, socialUuid: string, isKakao: boolean): Promise<void>;
    profileUpdate(userId: number, updateUserReqDTO: UpdateUserReqDTO, file: Express.Multer.File): Promise<void>;
    getUserProfileImageUrl(file: Express.Multer.File): Promise<string>;
    checkDuplicateNickname(nickname: string): Promise<boolean>;
}
