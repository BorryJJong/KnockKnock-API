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
import {LikeModule} from './api/like/like.module';
import {MyPageModule} from 'src/api/my-page/myPage.module';
import {HomeModule} from 'src/api/home/home.module';
import {APP_FILTER} from '@nestjs/core';
import {HttpExceptionFilter} from '@shared/filter/HttpException.Filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    AuthModule,
    FeedModule,
    PromotionsModule,
    ChallengesModule,
    LikeModule,
    MyPageModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
