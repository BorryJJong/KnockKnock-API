import { Repository } from 'typeorm';
import { CreateUserRequestDTO } from './dto/users.dto';
import { User } from './users.entity';
export declare class UserRepository extends Repository<User> {
    checkExistEmail({ email }: {
        email: any;
    }): Promise<void>;
    createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    findUserById(id: number): Promise<User>;
    findUserByIdWithoutPassword(id: string): Promise<User>;
}
