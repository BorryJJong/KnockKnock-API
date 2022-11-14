import { User } from '@entities/User';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/api/users/users.repository';
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly userRepository;
    constructor(jwtService: JwtService, configService: ConfigService, userRepository: UserRepository);
    makeJwtToken(userId: number): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    tokenValidateUser(userId: number): Promise<User | undefined>;
    verifyToken(token: string): Promise<any>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
}
