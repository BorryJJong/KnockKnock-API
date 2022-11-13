import {User} from '@entities/User';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {UserRepository} from 'src/api/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async makeJwtToken(userId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(
        {
          sub: userId,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15d',
        },
      ),
      this.jwtService.sign(
        {
          sub: userId,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async tokenValidateUser(userId: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      id: userId,
    });

    return user;
  }

  async verifyToken(token: string) {
    const result = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });
    return result;
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.updateRefreshToken(userId, refreshToken);
  }
}
