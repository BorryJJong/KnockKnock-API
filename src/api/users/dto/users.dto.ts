import {PickType} from '@nestjs/swagger';
import {User} from '../users.entity';

export class CreateUserRequestDTO extends PickType(User, [
  'email',
  'password',
  'nickName',
] as const) {}

export class GetUserRequestDTO extends PickType(User, ['id'] as const) {}

export class GetUserResponseDTO extends PickType(User, [
  'id',
  'email',
  'nickName',
  'createdAt',
] as const) {}
