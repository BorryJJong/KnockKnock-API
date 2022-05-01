import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ChallengesController } from './challenges.controller';
import { ChallengesRepository } from './challenges.repository';
import { ChallengesService } from './challenges.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([ChallengesRepository]),
      //forwardRef(() => AuthModule),
    ],
    controllers: [ChallengesController],
    providers: [ChallengesService],
  })
export class ChallengesModule {}
