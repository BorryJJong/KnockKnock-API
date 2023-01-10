import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {HomeController} from 'src/api/home/home.controller';
import {HomeService} from 'src/api/home/home.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPostRepository])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
