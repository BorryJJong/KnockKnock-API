import { User } from '@entities/User';
import { SOCIAL_TYPE } from '@shared/enums/enum';
import { ICreateUser, IUpdateUser, IUserRepository } from 'src/api/users/users.interface';
import { Repository } from 'typeorm';
export declare class UserRepository extends Repository<User> implements IUserRepository {
    insertUser(request: ICreateUser): Promise<User>;
    updateUser(request: IUpdateUser): Promise<void>;
    selectSocialUser(socialUuid: string, socialType: SOCIAL_TYPE): Promise<User | undefined>;
    findUserByEmail(email: string): Promise<User>;
    findUserById(id: number): Promise<User>;
    findUserByIdWithoutPassword(id: string): Promise<User>;
    isExistSocialUser(socialUuid: string, socialType: SOCIAL_TYPE): Promise<number>;
}
