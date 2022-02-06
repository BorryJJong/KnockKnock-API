import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../../users/users.entity';

export class LoginRequestDTO extends PickType(User, [
  'email',
  'password',
] as const) {}

export class LoginResponseDTO extends PickType(User, ['id'] as const) {
  @ApiProperty({ example: 'access_token' })
  @IsString()
  accessToken: string;
}
