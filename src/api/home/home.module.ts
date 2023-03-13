import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from 'aws-sdk';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {BlogPromotionRepository} from 'src/api/feed/repository/blogPromotion.repository';
import {HomeController} from 'src/api/home/home.controller';
import {HomeService} from 'src/api/home/home.service';
import {BannerRepository} from 'src/api/home/repository/Banner.Repository';
import {EventRepository} from 'src/api/home/repository/Event.Repository';
import {ShopRepository} from 'src/api/home/repository/Shop.Repository';
import {ImageModule} from 'src/api/image/image.module';
import {PromotionsRepository} from 'src/api/promotions/promotions.repository';

@Module({
  imports: [
    ImageModule,
    TypeOrmModule.forFeature([
      BlogPostRepository,
      EventRepository,
      BannerRepository,
      ShopRepository,
      BlogPromotionRepository,
      PromotionsRepository,
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
