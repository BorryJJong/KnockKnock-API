import {Injectable} from '@nestjs/common';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';
import {BlogPost} from '../../../entities/BlogPost';
import {CreateBlogPostDTO} from '../dto/feed.dto';
import {IGetBlogPostItems} from '../interface/blogPost.interface';

@Injectable()
@EntityRepository(BlogPost)
export class BlogPostRepository extends Repository<BlogPost> {
  createBlogPost(createBlogPostDTO: CreateBlogPostDTO): BlogPost {
    return this.create({...createBlogPostDTO});
  }

  async saveBlogPost(
    queryRunner: QueryRunner | null,
    blogPost: BlogPost,
  ): Promise<BlogPost> {
    if (queryRunner === null) {
      return await this.save(blogPost);
    } else {
      return await queryRunner.manager.save(blogPost);
    }
  }

  async getBlogPosts(
    skip: number,
    take: number,
    blogPostIds: number[],
  ): Promise<IGetBlogPostItems> {
    let queryBuilder = await this.createQueryBuilder('blogPost');

    if (blogPostIds.length > 0) {
      queryBuilder = queryBuilder.andWhereInIds(blogPostIds);
    }

    const [blogPosts, total] = await queryBuilder
      .skip(skip)
      .take(take)
      .orderBy('blogPost.regDate', 'ASC')
      .getManyAndCount();

    return {
      items: blogPosts,
      pagination: {
        total,
        skip,
        take,
      },
    };
  }

  async getListBlogPost(
    skip: number,
    take: number,
    blogPostIds: number[],
    excludeBlogPostId: number,
  ): Promise<IGetBlogPostItems> {
    let queryBuilder = await this.createQueryBuilder('blogPost').where(
      'blogPost.id != :id',
      {
        id: excludeBlogPostId,
      },
    );

    if (blogPostIds.length > 0) {
      queryBuilder = queryBuilder.andWhereInIds(blogPostIds);
    }

    const [blogPosts, total] = await queryBuilder
      .skip(skip)
      .take(take)
      .orderBy('RAND()')
      .getManyAndCount();

    return {
      items: blogPosts,
      pagination: {
        total: total + 1,
        skip,
        take,
      },
    };
  }

  async getBlogPost(blogPostId: number): Promise<BlogPost> {
    return await this.createQueryBuilder('blogPost')
      .where('blogPost.id = :id', {id: blogPostId})
      .getOneOrFail();
  }
}
