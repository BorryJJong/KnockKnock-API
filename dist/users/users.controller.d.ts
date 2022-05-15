import { AuthService } from '../auth/auth.service';
import { LoginRequestDTO, LoginResponseDTO } from '../auth/dto/auth.dto';
import { CreateUserRequestDTO, GetUserRequestDTO, GetUserResponseDTO } from './dto/users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UsersService, authService: AuthService);
    create(body: CreateUserRequestDTO): Promise<void>;
    login(data: LoginRequestDTO): Promise<LoginResponseDTO>;
    getUser(param: GetUserRequestDTO): Promise<GetUserResponseDTO>;
}
