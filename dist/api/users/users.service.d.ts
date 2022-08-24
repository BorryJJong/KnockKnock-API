import { CreateUserRequestDTO, GetUserRequestDTO, GetUserResponseDTO } from './dto/users.dto';
import { UserRepository } from './users.repository';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create({ email, nickName, password }: CreateUserRequestDTO): Promise<void>;
    getUser({ id }: GetUserRequestDTO): Promise<GetUserResponseDTO>;
}
