import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginRequestDTO} from './dto/auth.dto';
import {JwtService} from '@nestjs/jwt';
import {UserRepository} from '../api/users/users.repository';
import {User} from '../api/users/users.entity';
import {isComparePassword} from '../shared/utils';
import {IPayload} from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(user: User) {
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 유저입니다.');
    }
  }

  private async validatePassword(password: string, hash: string) {
    if (await !isComparePassword(password, hash)) {
      throw new UnauthorizedException('올바른 비밀번호가 아닙니다.');
    }
  }

  async jwtLogin({email, password}: LoginRequestDTO) {
    const user = await this.userRepository.findUserByEmail(email);
    await this.validateUser(user);
    await this.validatePassword(password, user.password);

    const payload: IPayload = {email, sub: user.id.toString()};
    return {
      id: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
