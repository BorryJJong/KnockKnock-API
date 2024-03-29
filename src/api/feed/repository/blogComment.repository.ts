import {Injectable} from '@nestjs/common';
import {
  Brackets,
  EntityRepository,
  getManager,
  QueryRunner,
  Repository,
} from 'typeorm';
import {BlogComment, IBlogComment} from 'src/entities/BlogComment';
import {
  GetBlogCommentDTO,
  GetListFeedCommentResDTO,
  InsBlogCommentDTO,
} from '../dto/feed.dto';
import {User} from 'src/entities/User';
import {IGetFeedsByCommentCountResponse} from 'src/api/feed/interface/blogComment.interface';

@Injectable()
@EntityRepository(BlogComment)
export class BlogCommentRepository extends Repository<BlogComment> {
  createBlogComment(
    insBlogCommentDTO: InsBlogCommentDTO,
    userId: number,
  ): BlogComment {
    const {postId, commentId, content} = insBlogCommentDTO;
    return this.create({
      userId,
      postId,
      content,
      commentId,
    });
  }

  async saveBlogComment(
    queryRunner: QueryRunner | null,
    BlogComment: BlogComment,
  ): Promise<BlogComment> {
    if (queryRunner === null) {
      return await this.save(BlogComment);
    } else {
      return await queryRunner.manager.save(BlogComment);
    }
  }

  /**
   * 리댓글 개수와 함께 댓글 목록 조회.
   * 리댓글 없는 댓글이 삭제된 경우 가져오지 않음.
   * 리댓글 있는 댓글이 삭제된 경우 내용을 '삭제된 댓글입니다.'로 변경하여 가져옴.
   * @param id postId
   * @returns GetFeedCommentResDTO[]
   */
  async getBlogCommentByPostId(
    id: number,
    excludeUserIds: number[],
  ): Promise<GetListFeedCommentResDTO[]> {
    let commentCountQueryBuilder = getManager()
      .createQueryBuilder()
      .select('comment_id', 'reply_id')
      .addSelect('COUNT(*)', 'cnt')
      .from(BlogComment, 'b')
      .innerJoin(User, 'u', 'b.user_id = u.id')
      .where('b.comment_id IS NOT NULL');

    if (excludeUserIds.length > 0) {
      commentCountQueryBuilder = commentCountQueryBuilder.andWhere(
        'b.user_id NOT IN (:...excludeUserIds)',
        {
          excludeUserIds,
        },
      );
    }

    let commentQuerybuilder = await getManager()
      .createQueryBuilder()
      .select('bc.id', 'id')
      .addSelect('bc.user_id', 'userId')
      .addSelect('u.nickname', 'nickname')
      .addSelect('u.image', 'image')
      .addSelect('IF(bc.del_date IS NULL, false, true) ', 'isDeleted')
      .addSelect(
        'IF( bc.del_date IS NOT NULL, "삭제된 댓글입니다.", bc.content )',
        'content',
      )
      .addSelect('bc.reg_date', 'regDate')
      .addSelect('IFNULL(bcnt.cnt, 0)', 'replyCnt')
      .from(BlogComment, 'bc')
      .innerJoin(User, 'u', 'bc.user_id = u.id')
      .leftJoinAndSelect(
        '(' + commentCountQueryBuilder.groupBy('b.comment_id').getQuery() + ')',
        'bcnt',
        'bc.id = bcnt.reply_id',
      )
      .where('(bcnt.cnt != 0 OR del_date IS NULL)')
      .andWhere('bc.comment_id IS NULL')
      .andWhere('bc.post_id = :id', {id: id})
      .orderBy('bc.id', 'ASC');

    if (excludeUserIds.length > 0) {
      commentQuerybuilder = commentQuerybuilder.andWhere(
        'bc.user_id NOT IN (:...excludeUserIds)',
        {
          excludeUserIds,
        },
      );
    }

    return commentQuerybuilder.getRawMany<GetListFeedCommentResDTO>();
  }

  /**
   * 리댓글 목록 조회
   * @param id 부모 댓글 id
   * @returns GetBlogCommentDTO
   */
  async getBlogCommentByCommentId(id: number, excludeUserIds: number[]) {
    let queryBuilder = await getManager()
      .createQueryBuilder()
      .select('bc.id', 'id')
      .addSelect('bc.user_id', 'userId')
      .addSelect('u.nickname', 'nickname')
      .addSelect('u.image', 'image')
      .addSelect('IF(bc.del_date IS NULL, false, true) ', 'isDeleted')
      .addSelect('bc.content', 'content')
      .addSelect('bc.reg_date', 'regDate')
      .from(BlogComment, 'bc')
      .innerJoin(User, 'u', 'bc.user_id = u.id')
      .where('bc.comment_id = :id', {id: id})
      .orderBy('bc.id', 'ASC');

    if (excludeUserIds.length > 0) {
      queryBuilder = queryBuilder.andWhere(
        'bc.user_id NOT IN (:...excludeUserIds)',
        {
          excludeUserIds,
        },
      );
    }

    return queryBuilder.getRawMany<GetBlogCommentDTO>();
  }

  async getBlogComment(id: number): Promise<IBlogComment> {
    return await this.findOneOrFail(id);
  }

  async getReplyBlogComments(id: number): Promise<IBlogComment[]> {
    return await this.find({
      where: {
        commentId: id,
      },
    });
  }

  async selectFeedsByCommentCount(
    postIds: number[],
    excludeUserIds: number[],
  ): Promise<IGetFeedsByCommentCountResponse[]> {
    let queryBuilder = await this.createQueryBuilder('blogComment')
      .select('blogComment.postId', 'postId')
      .addSelect('count(*)', 'commentCount')
      .innerJoin(User, 'u', 'blogComment.user_id = u.id')
      .where('blogComment.postId IN (:...postIds)', {
        postIds: postIds.length === 0 ? [] : postIds,
      });

    if (excludeUserIds.length > 0) {
      queryBuilder = queryBuilder.andWhere(
        'blogComment.userId NOT IN (:...excludeUserIds)',
        {
          excludeUserIds,
        },
      );

      // 부모 댓글이 차단된 사용자일 경우, 답글을 전부 카운트에서 제외한다
      const commentByBlockUser = await this.createQueryBuilder('blogComment')
        .where('blogComment.userId IN (:...excludeUserIds)', {
          excludeUserIds,
        })
        .andWhere('blogComment.commentId IS NULL')
        .getMany();

      if (commentByBlockUser.length > 0) {
        const excludeBlogCommentIds = commentByBlockUser.map(
          comment => comment.id,
        );

        queryBuilder = queryBuilder.andWhere(
          new Brackets(qb => {
            qb.where(
              'blogComment.commentId NOT IN (:...excludeBlogCommentIds)',
              {
                excludeBlogCommentIds,
              },
            ).orWhere('blogComment.commentId IS NULL');
          }),
        );
      }
    }

    return queryBuilder
      .groupBy('blogComment.postId')
      .getRawMany<IGetFeedsByCommentCountResponse>();
  }

  async selectBlogPostCommentByUser(
    id: number,
    userId: number,
  ): Promise<BlogComment | undefined> {
    return await this.createQueryBuilder('blogComment')
      .where('blogComment.id = :id', {
        id,
      })
      .andWhere('blogComment.userId = :userId', {
        userId,
      })
      .getOne();
  }

  async deleteBlogComment(ids: number[]): Promise<void> {
    await this.createQueryBuilder('blogComment')
      .softDelete()
      .from(BlogComment)
      .where('id IN (:...ids)', {
        ids,
      })
      .execute();
  }
}
