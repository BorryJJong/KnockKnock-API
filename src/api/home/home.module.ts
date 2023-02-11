import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {HomeController} from 'src/api/home/home.controller';
import {HomeService} from 'src/api/home/home.service';
import {EventRepository} from 'src/api/home/repository/EventRepository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPostRepository, EventRepository])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
