import { LoginRequestDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/users.repository';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    private validateUser;
    private validatePassword;
    jwtLogin({ email, password }: LoginRequestDTO): Promise<{
        id: number;
        accessToken: string;
    }>;
}
