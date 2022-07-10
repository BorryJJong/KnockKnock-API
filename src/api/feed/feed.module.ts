import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FeedService} from './feed.service';
import {FeedController} from './feed.controller';
import {ImageModule} from 'src/api/image/image.module';
import {BlogChallengesRepository} from './repository/blogChallenges.repository';
import {BlogImageRepository} from './repository/blogImage.repository';
import {BlogPostRepository} from './repository/blogPost.repository';
import {BlogPromotionRepository} from './repository/blogPromotion.repository';

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
