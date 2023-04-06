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
import {BlogChallenges} from '@entities/BlogChallenges';

export interface test {
  postId: number;
  scale: string;
  nickname: string;
  fileUrl: string;
}
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
    excludeBlogPostIds: number[],
    excludeUserIds: number[],
  ): Promise<IGetBlogPostItems> {
    let queryBuilder = await this.createQueryBuilder('blogPost').innerJoin(
      User,
      'u',
      'blogPost.user_id = u.id',
    );

    if (blogPostIds.length > 0) {
      queryBuilder = queryBuilder.andWhereInIds(blogPostIds);
    }

    if (excludeBlogPostIds.length > 0) {
      queryBuilder = queryBuilder.andWhere(
        'blogPost.id NOT IN (:...excludeBlogPostIds)',
        {
          excludeBlogPostIds,
        },
      );
    }

    if (excludeUserIds.length > 0) {
      queryBuilder = queryBuilder.andWhere(
        'blogPost.userId NOT IN (:...excludeUserIds)',
        {
          excludeUserIds,
        },
      );
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
    excludeBlogPostId: number[],
    excludeUserIds: number[],
  ): Promise<IGetBlogPostItems> {
    let queryBuilder = await this.createQueryBuilder('blogPost').innerJoin(
      User,
      'u',
      'blogPost.user_id = u.id',
    );

    if (excludeBlogPostId.length > 0) {
      queryBuilder = queryBuilder.andWhere('blogPost.id NOT IN (:...id)', {
        id: excludeBlogPostId,
      });
    }

    if (excludeUserIds.length > 0) {
      queryBuilder = queryBuilder.andWhere(
        'blogPost.user_id NOT IN (:...excludeUserIds)',
        {
          excludeUserIds,
        },
      );
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
      .innerJoin(User, 'u', 'blogPost.user_id = u.id')
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

      queryBuilder = queryBuilder.addSelect(sq => {
        return sq
          .from(BlogPost, 'bp')
          .select(`IF(bp.userId = ${userId}, true, false)`)
          .where('bp.id = :id', {
            id,
          });
      }, 'isWriter');
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
  async selectBlogPostByHotFeeds(
    challengeId: number,
    excludeUserIds: number[],
  ): Promise<GetListHotFeedResDTO[]> {
    let queryBuilder = this.createQueryBuilder('blogPost')
      .select('blogPost.id', 'postId')
      .addSelect('blogPost.scale', 'scale')
      .addSelect('user.nickname', 'nickname')
      .addSelect('count(*)', 'blogLikeCount')
      .innerJoin(User, 'user', 'user.id = blogPost.userId')
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

    if (+challengeId !== 0) {
      queryBuilder = queryBuilder
        .innerJoin(BlogChallenges, 'bc', 'bc.post_id = blogPost.id')
        .andWhere('bc.challengeId = :challengeId', {
          challengeId,
        });
    }

    if (excludeUserIds.length > 0) {
      queryBuilder = queryBuilder.andWhere(
        'blogPost.userId NOT IN (:...excludeUserIds)',
        {
          excludeUserIds,
        },
      );
    }

    const hotFeeds = await queryBuilder.limit(6).getRawMany<test>();

    return hotFeeds.map(feed => {
      return new GetListHotFeedResDTO(
        feed.postId,
        feed.scale,
        feed.nickname,
        feed.fileUrl,
      );
    });
  }

  async updateBlogPostHideCount(
    id: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.createQueryBuilder('blogPost', queryRunner)
      .update(BlogPost)
      .set({
        hideCount: () => 'hide_count+ 1',
      })
      .where('id = :id', {id})
      .execute();
  }
}
