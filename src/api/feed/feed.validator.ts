import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {IBlogPostRepository} from 'src/api/feed/interface/blogPost.interface';
import {BlogCommentRepository} from 'src/api/feed/repository/blogComment.repository';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {IUserRepository} from 'src/api/users/users.interface';
import {UserRepository} from 'src/api/users/users.repository';

@Injectable()
export class FeedValidator {
  constructor(
    @InjectRepository(BlogPostRepository)
    private blogPostRepository: IBlogPostRepository,
    @InjectRepository(BlogCommentRepository)
    private blogCommentRepository: BlogCommentRepository,
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
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

  public async checkFeedCommentAuthor(
    id: number,
    userId: number,
  ): Promise<void> {
    const response =
      await this.blogCommentRepository.selectBlogPostCommentByUser(id, userId);

    if (!response) {
      throw new HttpException(
        {
          message: '댓글 삭제 권한이 없습니다',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  public async checkPermissionCreateFeed(userId: number): Promise<void> {
    const user = await this.userRepository.selectUser(userId);

    if (!user) {
      throw new HttpException(
        {
          message: '피드 등록 권한이 없습니다',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  public async checkPermissionUpdateFeed(
    id: number,
    userId: number,
  ): Promise<void> {
    const user = await this.blogPostRepository.selectBlogPostByUser(id, userId);

    if (!user) {
      throw new HttpException(
        {
          message: '피드 수정 권한이 없습니다',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
