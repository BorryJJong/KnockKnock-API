import {Module} from '@nestjs/common';
import {FeedService} from './feed.service';
import {FeedController} from './feed.controller';
import {ImageModule} from 'src/api/image/image.module';
import {BlogChallenges} from 'src/entities/BlogChallenges';
import {BlogImage} from 'src/entities/BlogImage';
import {BlogPost} from 'src/entities/BlogPost';
import {BlogPromotion} from 'src/entities/BlogPromotion';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  controllers: [FeedController],
  providers: [FeedService],
  imports: [
    ImageModule,
    TypeOrmModule.forFeature([
      BlogChallenges,
      BlogImage,
      BlogPost,
      BlogPromotion,
    ]),
  ],
})
export class FeedModule {}
