import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils';
import {
  CreateUserRequestDTO,
  GetUserRequestDTO,
  GetUserResponseDTO,
} from './dto/users.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create({ email, nickname, password }: CreateUserRequestDTO) {
    await this.userRepository.checkExistEmail({ email });
    await this.userRepository.createUser({
      email,
      nickname,
      password: await hashPassword(password),
    });
  }

  async getUser({ id }: GetUserRequestDTO): Promise<GetUserResponseDTO> {
    const user = await this.userRepository.findUserById(id);
    const { email, nickname, createdAt } = user;
    return {
      id,
      email,
      nickname,
      createdAt,
    };
  }
}
