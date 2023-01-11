import { User } from '@entities/User';
import { UpdateUserReqDTO } from 'src/api/users/dto/users.dto';
import { ICreateUser } from 'src/api/users/users.interface';
import { SocialLoginRequestDTO } from 'src/auth/dto/auth.dto';
import { KakaoService } from 'src/auth/kakao.service';
import { Connection } from 'typeorm';
import { UserRepository } from './users.repository';
export declare class UsersService {
    private readonly userRepository;
    private readonly kakaoService;
    private connection;
    constructor(userRepository: UserRepository, kakaoService: KakaoService, connection: Connection);
    saveUser(request: ICreateUser): Promise<User>;
    getSocialUser({ socialUuid, socialType, }: SocialLoginRequestDTO): Promise<User | undefined>;
    getUser(userId: number): Promise<User | undefined>;
    getUserFindOrFail(userId: number): Promise<User>;
    logout(userId: number): Promise<void>;
    deleteUser(userId: number, socialUuid: string, isKakao: boolean): Promise<void>;
    profileUpdate(userId: number, updateUserReqDTO: UpdateUserReqDTO): Promise<void>;
}
