import { UserRepository } from 'src/api/users/users.repository';
export declare class MyPageService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    isLogin(userId: number): Promise<boolean>;
}
