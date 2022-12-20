import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {IBlogPostRepository} from 'src/api/feed/interface/blogPost.interface';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';

@Injectable()
export class FeedValidator {
  constructor(
    @InjectRepository(BlogPostRepository)
    private blogPostRepository: IBlogPostRepository,
  ) {}

  public async checkFeedAuthor(id: number, userId: number): Promise<void> {
    const response = await this.blogPostRepository.selectBlogPostByUser(
      id,
      userId,
    );

    if (!response) {
      throw new HttpException(
        {
          message: '게시글 삭제 권한이 없습니다',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
