import { UserRepository } from '../../api/users/users.repository';
import { IPayload } from './jwt.payload';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: IPayload): Promise<import("../../api/users/users.entity").User>;
}
export {};
