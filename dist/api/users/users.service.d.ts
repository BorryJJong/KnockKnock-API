import { User } from '@entities/User';
import { ICreateUser, IUpdateUser } from 'src/api/users/users.interface';
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
    updateUser(request: IUpdateUser): Promise<void>;
    getSocialUser({ socialUuid, socialType, }: SocialLoginRequestDTO): Promise<User | undefined>;
    getUser(userId: number): Promise<User | undefined>;
    logout(userId: number): Promise<void>;
    deleteUser(userId: number, socialUuid: string): Promise<void>;
}
