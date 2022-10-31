import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    makeJwtToken(userId: number): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
