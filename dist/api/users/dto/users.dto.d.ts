import { User } from '../users.entity';
declare const CreateUserRequestDTO_base: import("@nestjs/common").Type<Pick<User, "email" | "password" | "nickName">>;
export declare class CreateUserRequestDTO extends CreateUserRequestDTO_base {
}
declare const GetUserRequestDTO_base: import("@nestjs/common").Type<Pick<User, "id">>;
export declare class GetUserRequestDTO extends GetUserRequestDTO_base {
}
declare const GetUserResponseDTO_base: import("@nestjs/common").Type<Pick<User, "id" | "createdAt" | "email" | "nickName">>;
export declare class GetUserResponseDTO extends GetUserResponseDTO_base {
}
export {};
