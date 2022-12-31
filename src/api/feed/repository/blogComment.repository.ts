import {Injectable} from '@nestjs/common';
import {EntityRepository, getManager, QueryRunner, Repository} from 'typeorm';
import {BlogComment} from 'src/entities/BlogComment';
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
   * @returns GetFeedCommentResDTO
   */
  async getBlogCommentByPostId(id: number) {
    const cntQb = getManager()
      .createQueryBuilder()
      .select('comment_id', 'reply_id')
      .addSelect('COUNT(*)', 'cnt')
      .from(BlogComment, 'b')
      .where('b.comment_id IS NOT NULL')
      .groupBy('b.comment_id');

    const comment: GetListFeedCommentResDTO[] = await getManager()
      .createQueryBuilder()
      .select('bc.id', 'id')
      .addSelect('bc.user_id', 'userId')
      .addSelect('u.nickname', 'nickname')
      .addSelect('u.image', 'image')
      .addSelect('bc.is_deleted', 'isDeleted')
      .addSelect(
        'IF( bc.is_deleted = 1, "삭제된 댓글입니다.", bc.content )',
        'content',
      )
      .addSelect('bc.reg_date', 'regDate')
      .addSelect('IFNULL(bcnt.cnt, 0)', 'replyCnt')
      .from(BlogComment, 'bc')
      .innerJoin(User, 'u', 'bc.user_id = u.id')
      .leftJoinAndSelect(
        '(' + cntQb.getQuery() + ')',
        'bcnt',
        'bc.id = bcnt.reply_id',
      )
      .where('(bcnt.cnt != 0 OR is_deleted = 0)')
      .andWhere('bc.comment_id IS NULL')
      .andWhere('bc.post_id = :id', {id: id})
      .orderBy('bc.id', 'ASC')
      .getRawMany();

    return comment;
  }

  /**
   * 리댓글 목록 조회
   * @param id 부모 댓글 id
   * @returns GetBlogCommentDTO
   */
  async getBlogCommentByCommentId(id: number) {
    const comment: GetBlogCommentDTO[] = await getManager()
      .createQueryBuilder()
      .select('bc.id', 'id')
      .addSelect('bc.user_id', 'userId')
      .addSelect('u.nickname', 'nickname')
      .addSelect('u.image', 'image')
      .addSelect('bc.is_deleted', 'isDeleted')
      .addSelect('bc.content', 'content')
      .addSelect('bc.reg_date', 'regDate')
      .from(BlogComment, 'bc')
      .innerJoin(User, 'u', 'bc.user_id = u.id')
      .where('bc.is_deleted = 0')
      .andWhere('bc.comment_id = :id', {id: id})
      .orderBy('bc.id', 'ASC')
      .getRawMany();

    return comment;
  }

  async getBlogComment(id: number): Promise<BlogComment> {
    return await this.findOne(id);
  }

  async selectFeedsByCommentCount(
    postIds: number[],
  ): Promise<IGetFeedsByCommentCountResponse[]> {
    return await this.createQueryBuilder('blogComment')
      .select('blogComment.postId', 'postId')
      .addSelect('count(*)', 'commentCount')
      .where('blogComment.postId IN (:...postIds)', {
        postIds: postIds.length === 0 ? [] : postIds,
      })
      .andWhere('blogComment.isDeleted = :isDeleted', {
        isDeleted: false,
      })
      .groupBy('blogComment.postId')
      .getRawMany<IGetFeedsByCommentCountResponse>();
  }
}
