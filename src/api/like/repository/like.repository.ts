import {Injectable} from '@nestjs/common';
import {GetFeedLikeDTO} from 'src/api/feed/dto/feed.dto';
import {IGetFeedsByLikeCountResponse} from 'src/api/like/like.interface';
import {EntityRepository, getManager, In, Repository} from 'typeorm';
import {BlogLike} from '../../../entities/BlogLike';
import {User} from '../../../entities/User';

@Injectable()
@EntityRepository(BlogLike)
export class BlogLikeRepository extends Repository<BlogLike> {
  async insertFeedLike(id: number, userId: number): Promise<boolean> {
    await this.manager.save(
      this.manager.create(BlogLike, {
        postId: id,
        userId,
      }),
    );
    return true;
  }

  async deleteFeedLike(id: number, userId: number): Promise<boolean> {
    await this.manager.delete(BlogLike, {postId: id, userId});
    return true;
  }

  async getListFeedLike(
    postId: number,
    excludeUserIds: number[],
  ): Promise<GetFeedLikeDTO[]> {
    let queryBuilder = await getManager()
      .createQueryBuilder()
      .select('bl.id', 'id')
      .addSelect('bl.user_id', 'userId')
      .addSelect('u.nickname', 'userName')
      .addSelect('u.image', 'userImage')
      .from(BlogLike, 'bl')
      .innerJoin(User, 'u', 'bl.user_id = u.id')
      .where('bl.post_id = :postId', {postId: postId});

    if (excludeUserIds.length > 0) {
      queryBuilder = queryBuilder.where(
        'bl.user_id NOT IN (:...excludeUserIds)',
        {
          excludeUserIds,
        },
      );
    }

    return queryBuilder.getRawMany();
  }

  async selectFeedListByUserLikes(
    postIds: number[],
    userId: number,
  ): Promise<BlogLike[]> {
    return await this.manager.find(BlogLike, {
      where: {
        postId: In(postIds),
        userId,
      },
    });
  }

  async selectFeedsByLikeCount(
    postIds: number[],
    excludeUserIds: number[],
  ): Promise<IGetFeedsByLikeCountResponse[]> {
    let queryBuilder = await this.createQueryBuilder('blogLike')
      .select('blogLike.postId', 'postId')
      .addSelect('count(*)', 'likeCount')
      .where('blogLike.postId IN (:...postIds)', {
        postIds,
      });

    if (excludeUserIds.length < 0) {
      queryBuilder = queryBuilder.andWhere(
        'blogLike.userId NOT IN (:...excludeUserIds)',
        {
          excludeUserIds,
        },
      );
    }

    return queryBuilder
      .groupBy('blogLike.postId')
      .getRawMany<IGetFeedsByLikeCountResponse>();
  }

  async selectFeedByUser(postId: number, userId: number): Promise<number> {
    return await this.createQueryBuilder('blogLike')
      .where('blogLike.postId = :postId', {
        postId,
      })
      .andWhere('blogLike.userId = :userId', {
        userId,
      })
      .getCount();
  }
}
