import { User } from '@entities/User';
import { ICreateUser, IUpdateUser } from 'src/api/users/users.interface';
import { SocialLoginRequestDTO } from 'src/auth/dto/auth.dto';
import { UserRepository } from './users.repository';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    saveUser(request: ICreateUser): Promise<User>;
    updateUser(request: IUpdateUser): Promise<void>;
    getSocialUser({ socialUuid, socialType, }: SocialLoginRequestDTO): Promise<User | undefined>;
}
