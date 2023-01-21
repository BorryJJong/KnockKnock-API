import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {GetListHotFeedResDTO} from 'src/api/home/dto/home.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(BlogPostRepository)
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

  async getListHotFeed(challengeId: number): Promise<GetListHotFeedResDTO[]> {
    return this.blogPostRepository.selectBlogPostByHotFeeds(challengeId);
  }
}
