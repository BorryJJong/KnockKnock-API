import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {ChallengesModule} from './api/challenges/challenges.module';
import {ormConfig} from './config/orm';
import {UsersModule} from './api/users/users.module';
import {FeedModule} from './api/feed/feed.module';
import {PromotionsModule} from './api/promotions/promotions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    AuthModule,
    FeedModule,
    PromotionsModule,
    ChallengesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
