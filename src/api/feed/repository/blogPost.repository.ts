import {Injectable} from '@nestjs/common';
import {BlogPost} from '../../../entities/BlogPost';
import {
  IBlogPostRepository,
  IGetBlogPostItems,
} from '../interface/blogPost.interface';
import {EntityRepository, getManager, QueryRunner, Repository} from 'typeorm';
import {CreateBlogPostDTO, GetBlogPostDTO} from '../dto/feed.dto';
import {User} from '../../../entities/User';

@Injectable()
@EntityRepository(BlogPost)
export class BlogPostRepository
  extends Repository<BlogPost>
  implements IBlogPostRepository
{
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

  async getBlogPostById(id: number): Promise<GetBlogPostDTO> {
    const post: GetBlogPostDTO = await getManager()
      .createQueryBuilder()
      .select('bp.id', 'id')
      .addSelect('bp.user_id', 'userId')
      .addSelect('bp.content', 'content')
      .addSelect('bp.store_address', 'storeAddress')
      .addSelect('bp.location_x', 'locationX')
      .addSelect('bp.location_y', 'locationY')
      .addSelect('bp.reg_date', 'regDate')
      .addSelect('u.nickname', 'nickname')
      .addSelect('u.image', 'image')
      .from(BlogPost, 'bp')
      .innerJoin(User, 'u', 'bp.user_id = u.id')
      .where('bp.id = :id', {id: id})
      .getRawOne();

    return post;
  }
}
