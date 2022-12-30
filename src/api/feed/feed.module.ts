import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FeedService} from './feed.service';
import {FeedController} from './feed.controller';
import {ImageModule} from 'src/api/image/image.module';
import {BlogChallengesRepository} from './repository/blogChallenges.repository';
import {BlogImageRepository} from './repository/blogImage.repository';
import {BlogPostRepository} from './repository/blogPost.repository';
import {BlogPromotionRepository} from './repository/blogPromotion.repository';
import {BlogCommentRepository} from './repository/blogComment.repository';
import {JwtOptionalGuard} from 'src/auth/jwt/jwtNoneRequired.guard';
import {BlogLikeRepository} from 'src/api/like/repository/like.repository';
import {UserRepository} from 'src/api/users/users.repository';
import {FeedValidator} from 'src/api/feed/feed.validator';

@Module({
  imports: [
    ImageModule,
    TypeOrmModule.forFeature([
      BlogChallengesRepository,
      BlogImageRepository,
      BlogPostRepository,
      BlogPromotionRepository,
      BlogCommentRepository,
      BlogLikeRepository,
      UserRepository,
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService, JwtOptionalGuard, FeedValidator],
})
export class FeedModule {}
