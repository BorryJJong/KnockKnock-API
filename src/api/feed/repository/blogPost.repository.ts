import {Injectable} from '@nestjs/common';
import {BlogPost} from '../../../entities/BlogPost';
import {
  IBlogPostRepository,
  IGetBlogPostItems,
} from '../interface/blogPost.interface';
import {EntityRepository, getManager, QueryRunner, Repository} from 'typeorm';
import {
  CreateBlogPostDTO,
  GetBlogPostDTO,
  UpdateBlogPostDTO,
} from '../dto/feed.dto';
import {User} from '../../../entities/User';
import {getCurrentPageCount} from '../../../shared/utils';
import {BlogLike} from '@entities/BlogLike';
import {GetListHotFeedResDTO} from 'src/api/home/dto/home.dto';
import {BlogImage} from '@entities/BlogImage';

@Injectable()
@EntityRepository(BlogPost)
export class BlogPostRepository
  extends Repository<BlogPost>
  implements IBlogPostRepository
{
  createBlogPost(
    createBlogPostDTO: CreateBlogPostDTO | UpdateBlogPostDTO,
    userId?: number,
  ): BlogPost {
    return this.create({...createBlogPostDTO, userId});
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

  async updateBlogPost(
    queryRunner: QueryRunner | null,
    postId: number,
    blogPost: BlogPost,
  ) {
    if (queryRunner === null) {
      return await this.update(postId, blogPost);
    } else {
      return await queryRunner.manager.update(BlogPost, postId, blogPost);
    }
  }

  async getBlogPosts(
    page: number,
    take: number,
    blogPostIds: number[],
  ): Promise<IGetBlogPostItems> {
    let queryBuilder = await this.createQueryBuilder('blogPost');

    if (blogPostIds.length > 0) {
      queryBuilder = queryBuilder.andWhereInIds(blogPostIds);
    }

    const [blogPosts, total] = await queryBuilder
      .skip(getCurrentPageCount(page, take))
      .take(take)
      .orderBy('blogPost.hits', 'DESC')
      .addOrderBy('blogPost.regDate', 'DESC')
      .getManyAndCount();

    return {
      items: blogPosts,
      pagination: {
        total,
        page,
        take,
      },
    };
  }

  async getListBlogPost(
    page: number,
    take: number,
    blogPostIds: number[],
    excludeBlogPostId?: number,
  ): Promise<IGetBlogPostItems> {
    let queryBuilder = await this.createQueryBuilder('blogPost');

    if (excludeBlogPostId) {
      queryBuilder = queryBuilder.where('blogPost.id != :id', {
        id: excludeBlogPostId,
      });
    }

    if (blogPostIds.length > 0) {
      queryBuilder = queryBuilder.andWhereInIds(blogPostIds);
    }

    const limit = +page === 1 ? take - 1 : take;
    const [blogPosts, total] = await queryBuilder
      // .skip(getCurrentPageCount(page, take))
      // .take(take)
      .orderBy('RAND()')
      .limit(limit)
      .getManyAndCount();

    return {
      items: blogPosts,
      pagination: {
        total: total + 1,
        page,
        take,
      },
    };
  }

  async getBlogPost(blogPostId: number): Promise<BlogPost> {
    return await this.createQueryBuilder('blogPost')
      .where('blogPost.id = :id', {id: blogPostId})
      .getOneOrFail();
  }

  async getBlogPostById(
    id: number,
    userId?: number,
  ): Promise<GetBlogPostDTO | undefined> {
    let queryBuilder = getManager()
      .createQueryBuilder()
      .select('bp.id', 'id')
      .addSelect('bp.user_id', 'userId')
      .addSelect('bp.content', 'content')
      .addSelect('bp.store_address', 'storeAddress')
      .addSelect('bp.store_name', 'storeName')
      .addSelect('bp.location_x', 'locationX')
      .addSelect('bp.location_y', 'locationY')
      .addSelect('bp.reg_date', 'regDate')
      .addSelect('bp.scale', 'scale')
      .addSelect('u.nickname', 'userName')
      .addSelect('u.image', 'userImage')
      .from(BlogPost, 'bp')
      .innerJoin(User, 'u', 'bp.user_id = u.id')
      .leftJoin(BlogLike, 'bl', 'bl.user_id = u.id')
      .where('bp.id = :id', {id: id});

    if (userId) {
      queryBuilder = queryBuilder.addSelect(sq => {
        return sq
          .from(BlogLike, 'bl')
          .select('IF(bl.id, true, false)')
          .where('bl.userId = :userId', {
            userId,
          })
          .andWhere('bl.postId = :postId', {
            postId: id,
          });
      }, 'isLike');
    }

    return await queryBuilder.getRawOne<GetBlogPostDTO>();
  }

  async updateBlogPostHits(id: number): Promise<void> {
    await this.createQueryBuilder('blogPost')
      .update()
      .where('id = :id', {id})
      .set({hits: () => '`hits` + 1'})
      .execute();
  }

  async deleteBlogPost(id: number, queryRunner?: QueryRunner): Promise<void> {
    await this.createQueryBuilder('blogPost', queryRunner)
      .where('id = :id', {id})
      .softDelete()
      .execute();
  }

  async selectBlogPostByUser(
    id: number,
    userId: number,
  ): Promise<BlogPost | undefined> {
    return this.createQueryBuilder('blogPost')
      .where('id = :id', {id})
      .andWhere('blogPost.userId = :userId', {userId})
      .getOne();
  }

  // TODO: 데이터가 확장될 경우, 날짜를 Today로 제한
  async selectBlogPostByHotFeeds(): Promise<GetListHotFeedResDTO[]> {
    let queryBuilder = this.createQueryBuilder('blogPost')
      .select('blogPost.id', 'postId')
      .addSelect('blogPost.scale', 'scale')
      .addSelect('user.nickname', 'nickname')
      .addSelect('count(*)', 'blogLikeCount')
      .innerJoin(User, 'user', 'user.id = blogPost.id')
      .innerJoin(BlogImage, 'bi', 'bi.post_id = blogPost.id')
      .leftJoin(BlogLike, 'blogLike', 'blogLike.post_id = blogPost.id')
      .where('blogPost.delDate IS NULL')
      .orderBy('blogPost.hits', 'DESC')
      .addOrderBy('blogLikeCount', 'DESC')
      .addOrderBy('blogPost.regDate', 'DESC')
      .groupBy('blogPost.id')
      .addGroupBy('fileUrl');

    queryBuilder = queryBuilder.addSelect(sq => {
      return sq
        .select('bi.file_url')
        .from(BlogImage, 'bi')
        .where('bi.postId = blogPost.id')
        .limit(1);
    }, 'fileUrl');

    const hotFeeds = await queryBuilder.getRawMany<GetListHotFeedResDTO>();

    return hotFeeds.map(feed => {
      return new GetListHotFeedResDTO(
        feed.postId,
        feed.scale,
        feed.nickname,
        feed.fileUrl,
      );
    });
  }
}
