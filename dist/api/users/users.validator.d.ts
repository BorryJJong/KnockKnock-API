import { SOCIAL_TYPE } from '@shared/enums/enum';
import { IUserRepository } from 'src/api/users/users.interface';
export declare class UserValidator {
    private userRepository;
    constructor(userRepository: IUserRepository);
    checkExistSocialUser(socialUuid: string, socialType: SOCIAL_TYPE): Promise<void>;
    checkDuplicateNickname(nickname: string): Promise<void>;
}
