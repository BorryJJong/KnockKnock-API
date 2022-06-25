import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FeedService} from './feed.service';
import {FeedController} from './feed.controller';
import {ImageModule} from 'src/api/image/image.module';
import {BlogChallengesRepository} from './blogChallenges.repository';
import {BlogImageRepository} from './blogImage.repository';
import {BlogPostRepository} from './blogPost.repository';
import {BlogPromotionRepository} from './blogPromotion.repository';

@Module({
  imports: [
    ImageModule,
    TypeOrmModule.forFeature([
      BlogChallengesRepository,
      BlogImageRepository,
      BlogPostRepository,
      BlogPromotionRepository,
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
