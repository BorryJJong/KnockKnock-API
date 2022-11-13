import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JwtAuthGuard} from 'src/auth/jwt/jwt.guard';
import {ChallengesController} from './challenges.controller';
import {ChallengesRepository} from './challenges.repository';
import {ChallengesService} from './challenges.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChallengesRepository])],
  controllers: [ChallengesController],
  providers: [ChallengesService, JwtAuthGuard],
})
export class ChallengesModule {}
