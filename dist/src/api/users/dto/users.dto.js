"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserResponseDTO = exports.GetUserRequestDTO = exports.CreateUserRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_entity_1 = require("../users.entity");
class CreateUserRequestDTO extends (0, swagger_1.PickType)(users_entity_1.User, [
    'email',
    'password',
    'nickName',
]) {
}
exports.CreateUserRequestDTO = CreateUserRequestDTO;
class GetUserRequestDTO extends (0, swagger_1.PickType)(users_entity_1.User, ['id']) {
}
exports.GetUserRequestDTO = GetUserRequestDTO;
class GetUserResponseDTO extends (0, swagger_1.PickType)(users_entity_1.User, [
    'id',
    'email',
    'nickName',
    'createdAt',
]) {
}
exports.GetUserResponseDTO = GetUserResponseDTO;
//# sourceMappingURL=users.dto.js.map