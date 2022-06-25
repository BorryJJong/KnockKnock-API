import { User } from '../../api/users/users.entity';
declare const LoginRequestDTO_base: import("@nestjs/common").Type<Pick<User, "email" | "password">>;
export declare class LoginRequestDTO extends LoginRequestDTO_base {
}
declare const LoginResponseDTO_base: import("@nestjs/common").Type<Pick<User, "id">>;
export declare class LoginResponseDTO extends LoginResponseDTO_base {
    accessToken: string;
}
export {};
