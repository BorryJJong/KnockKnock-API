import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Connection, QueryRunner} from 'typeorm';
import {plainToInstance} from 'class-transformer';
import {
  CreateFeedDTO,
  UpdateFeedDTO,
  CreateBlogPostDTO,
  GetListFeedMainReqDTO,
  GetListFeedMainResDTO,
  GetFeedMainResDTO,
  GetListFeedReqQueryDTO,
  GetListFeedResDTO,
  GetFeedResDTO,
  InsBlogCommentDTO,
  GetFeedViewReqDTO,
  GetFeedViewResDTO,
  GetBlogChallengesDTO,
  GetBlogPromotionDTO,
  GetBlogPostDTO,
  GetBlogImageDTO,
  GetListFeedCommentReqDTO,
  GetListFeedCommentResDTO,
  GetBlogCommentDTO,
  DelBlogCommentReqDTO,
  UpdateBlogPostDTO,
} from './dto/feed.dto';
import {ImageService} from 'src/api/image/image.service';
import {BlogChallengesRepository} from './repository/blogChallenges.repository';
import {BlogImageRepository} from './repository/blogImage.repository';
import {BlogPostRepository} from './repository/blogPost.repository';
import {BlogPromotionRepository} from './repository/blogPromotion.repository';
import {IGetBlogImagesByBlogPost} from './interface/blogImage.interface';
import {BlogCommentRepository} from './repository/blogComment.repository';
import {
  IBlogPostRepository,
  IGetBlogPostItem,
} from './interface/blogPost.interface';
import {commafy, convertTimeToStr, isPageNext} from '../../shared/utils';
import {BlogPost} from '@entities/BlogPost';
import {BlogComment} from '@entities/BlogComment';
import {BlogLikeRepository} from 'src/api/like/repository/like.repository';
import {BlogLike} from '@entities/BlogLike';
import {UserRepository} from 'src/api/users/users.repository';
import {User} from '@entities/User';

@Injectable()
export class FeedService {
  private readonly logger = new Logger(FeedService.name);

  constructor(
    private readonly imageService: ImageService,
    private connection: Connection,
    @InjectRepository(BlogPostRepository)
    private blogPostRepository: IBlogPostRepository,
    @InjectRepository(BlogChallengesRepository)
    private blogChallengesRepository: BlogChallengesRepository,
    @InjectRepository(BlogPromotionRepository)
    private blogPromotionRepository: BlogPromotionRepository,
    @InjectRepository(BlogImageRepository)
    private blogImageRepository: BlogImageRepository,
    @InjectRepository(BlogCommentRepository)
    private blogCommentRepository: BlogCommentRepository,
    @InjectRepository(BlogLikeRepository)
    private blogLikeRepository: BlogLikeRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO) {
    const queryRunner = this.connection.createQueryRunner();
    let result = false;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. 포스트 저장
      const post = await this.savePost(queryRunner, createFeedDTO);
      const postId: number = post.id;

      // 2. 챌린지 저장
      await this.saveChallenges(queryRunner, postId, createFeedDTO.challenges);

      // 3. 프로모션 저장
      await this.savePromotion(queryRunner, postId, createFeedDTO.promotions);

      // 4. 이미지 저장
      if (files !== undefined) {
        await Promise.all(
          files.map(
            async file => await this.savePostImage(queryRunner, postId, file),
          ),
        );
      }

      // throw new InternalServerErrorException(); // 일부러 에러를 발생시켜 본다
      // await queryRunner.commitTransaction();
      await queryRunner.commitTransaction();
      result = true;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return result;
  }

  async savePost(
    queryRunner: QueryRunner,
    createBlogPostDTO: CreateBlogPostDTO,
  ) {
    const post = this.blogPostRepository.createBlogPost(createBlogPostDTO);
    const returned = await this.blogPostRepository.saveBlogPost(
      queryRunner,
      post,
    );

    return returned;
  }

  async saveChallenges(
    queryRunner: QueryRunner,
    postId: number,
    challenges: string,
  ) {
    await Promise.all(
      challenges.split(',').map(async id => {
        const challenge = this.blogChallengesRepository.createBlogChallenges({
          postId: postId,
          challengeId: Number(id),
        });
        await this.blogChallengesRepository.saveBlogChallenges(
          queryRunner,
          challenge,
        );
      }),
    );
  }

  async savePromotion(
    queryRunner: QueryRunner,
    postId: number,
    promotions: string,
  ) {
    await Promise.all(
      promotions.split(',').map(async id => {
        const promotion = this.blogPromotionRepository.createBlogPromotion({
          postId: postId,
          promotionId: Number(id),
        });
        await this.blogPromotionRepository.saveBlogPromotion(
          queryRunner,
          promotion,
        );
      }),
    );
  }

  async savePostImage(
    queryRunner: QueryRunner,
    postId: number,
    file: Express.Multer.File,
  ) {
    let resultS3 = null;
    try {
      // 1. image s3 upload
      resultS3 = await this.imageService.uploadS3(file, 'feed');

      if (!resultS3.ok) {
        throw new HttpException(
          {
            error: 'S3 image upload failed',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // 2. save db
      const image = this.blogImageRepository.createBlogImage({
        postId: postId,
        fileUrl: resultS3.url,
      });

      await this.blogImageRepository.saveBlogImage(queryRunner, image);
    } catch (e) {
      if (resultS3.ok) {
        this.imageService.deleteS3(resultS3.Key);
      }
      throw new HttpException(
        {
          error: e.message,
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveBlogComment(insBlogCommentDTO: InsBlogCommentDTO) {
    try {
      const comment =
        this.blogCommentRepository.createBlogComment(insBlogCommentDTO);
      await this.blogCommentRepository.saveBlogComment(null, comment);
    } catch (e) {
      throw new HttpException(
        {
          error: e.message,
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFeed({id}: GetFeedViewReqDTO): Promise<GetFeedViewResDTO> {
    try {
      const post = await this.blogPostRepository.getBlogPostById(id);
      const promotions =
        await this.blogPromotionRepository.getBlogPromotionByPostId(id);
      const challenges =
        await this.blogChallengesRepository.getBlogChallengesByPostId(id);
      const images = await this.blogImageRepository.getBlogImageByPostId(id);

      const result: GetFeedViewResDTO = {
        feed: plainToInstance(GetBlogPostDTO, post),
        promotions: plainToInstance(GetBlogPromotionDTO, promotions),
        challenges: plainToInstance(GetBlogChallengesDTO, challenges),
        images: plainToInstance(GetBlogImageDTO, images),
      };

      return result;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        {
          error: e.message,
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(updateFeedDTO: UpdateFeedDTO) {
    const queryRunner = this.connection.createQueryRunner();
    let result = false;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. 포스트 저장
      const postId: number = updateFeedDTO.id;
      const post = await this.updatePost(queryRunner, postId, updateFeedDTO);

      // 2. 챌린지 저장
      await this.updateChallenges(
        queryRunner,
        postId,
        updateFeedDTO.challenges,
      );

      // // 3. 프로모션 저장
      await this.updatePromotion(queryRunner, postId, updateFeedDTO.promotions);

      await queryRunner.commitTransaction();
      result = true;
    } catch (e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return result;
  }

  async updatePost(
    queryRunner: QueryRunner,
    postId: number,
    updateBlogPostDTO: UpdateBlogPostDTO,
  ) {
    const post = this.blogPostRepository.createBlogPost(updateBlogPostDTO);
    post.modDate = new Date();

    const returned = await this.blogPostRepository.updateBlogPost(
      queryRunner,
      postId,
      post,
    );
    return returned;
  }

  async updateChallenges(
    queryRunner: QueryRunner,
    postId: number,
    challenges: string,
  ) {
    // 1. 모든 챌린지 삭제
    await this.blogChallengesRepository.deleteBlogChallengesByPostId(
      queryRunner,
      postId,
    );

    // 2. 재저장
    await Promise.all(
      challenges.split(',').map(async id => {
        const challenge = this.blogChallengesRepository.createBlogChallenges({
          postId: postId,
          challengeId: Number(id),
        });
        await this.blogChallengesRepository.saveBlogChallenges(
          queryRunner,
          challenge,
        );
      }),
    );
  }

  async updatePromotion(
    queryRunner: QueryRunner,
    postId: number,
    promotions: string,
  ) {

    // 1. 모든 프로모션 삭제
    await this.blogPromotionRepository.deleteBlogPromotionByPostId(
      queryRunner,
      postId,
    );
    
    // 2. 재저장
    await Promise.all(
      promotions.split(',').map(async id => {
        const promotion = this.blogPromotionRepository.createBlogPromotion({
          postId: postId,
          promotionId: Number(id),
        });
        await this.blogPromotionRepository.saveBlogPromotion(
          queryRunner,
          promotion,
        );
      }),
    );
  }

  public async getFeedsByChallengesFilter(
    query: GetListFeedMainReqDTO,
  ): Promise<GetListFeedMainResDTO> {
    let blogPostIds: number[] = [];
    const blogChallenges =
      await this.blogChallengesRepository.getBlogChallengesByChallengeId(
        query.challengeId,
      );

    if (blogChallenges.length > 0) {
      blogPostIds = blogChallenges.map(bc => bc.postId);
    }

    const blogPosts = await this.blogPostRepository.getBlogPosts(
      query.page,
      query.take,
      blogPostIds,
    );

    const blogImages: IGetBlogImagesByBlogPost[] =
      await this.blogImageRepository.getBlogImagesByBlogPost(
        blogPosts.items.map(post => post.id),
      );

    return {
      feeds: blogPosts.items.map(blogPost => {
        const filterBlogImages = blogImages.filter(
          blogImage => blogImage.postId === blogPost.id,
        );
        const isImageMore = filterBlogImages.length > 1 ? true : false;
        const thumbnailUrl = filterBlogImages[0].fileUrl;

        return new GetFeedMainResDTO(blogPost.id, thumbnailUrl, isImageMore);
      }),

      isNext: isPageNext(
        blogPosts.pagination.page,
        blogPosts.pagination.take,
        blogPosts.pagination.total,
      ),
      total: blogPosts.pagination.total,
    };
  }

  public async getListFeed(
    query: GetListFeedReqQueryDTO,
    userId?: number,
  ): Promise<GetListFeedResDTO> {
    const {feedId: blogPostId, challengeId, page: skip, take} = query;
    // 선택한 데이터 맨상단에 노출 [데이터 고정]
    let excludeBlogPostId: number;
    let selectBlogPost: BlogPost;
    if (+skip === 1) {
      selectBlogPost = await this.blogPostRepository.getBlogPost(blogPostId);
      excludeBlogPostId = selectBlogPost.id;
    }

    // 챌린지ID가 있다면, 챌린지ID에 맞는 데이터를 랜덤으로 노출
    let blogPostIds: number[] = [];
    if (challengeId) {
      const blogChallenges =
        await this.blogChallengesRepository.getBlogChallengesByChallengeId(
          challengeId,
        );
      blogPostIds = blogChallenges.map(bc => bc.postId);
    }

    const blogPosts = await this.blogPostRepository.getListBlogPost(
      skip,
      this.getFeedListTake(skip, take),
      blogPostIds,
      excludeBlogPostId,
      userId,
    );

    if (+skip === 1) {
      blogPosts.items.unshift(selectBlogPost);
    }

    let blogImages: IGetBlogImagesByBlogPost[] = [];
    blogPostIds = blogPosts.items.map(bp => bp.id);
    if (blogPostIds.length > 0) {
      blogImages = await this.blogImageRepository.getBlogImagesByBlogPost(
        blogPostIds,
      );
    }

    const feedsCommentCount =
      await this.blogCommentRepository.selectFeedsByCommentCount(blogPostIds);
    const feedsLikeCount = await this.blogLikeRepository.selectFeedsByLikeCount(
      blogPostIds,
    );

    // 비회원의 경우 false, 회원인 경우 좋아요 여부 확인
    let likes = [];
    if (userId) {
      likes = await this.getFeedListByUserLikes(blogPostIds, userId);
    }

    const findUsers = await this.getFeedListByUserInfo(
      blogPosts.items.map(b => b.userId),
    );

    return {
      feeds: blogPosts.items.map((blogPost: IGetBlogPostItem) => {
        const writer = findUsers.find(user => user.id === blogPost.userId);
        return new GetFeedResDTO(
          blogPost.id,
          writer.nickname,
          writer.image,
          blogPost.content,
          convertTimeToStr(blogPost.regDate),
          '1:1',
          commafy(
            feedsLikeCount.find(like => like.postId === blogPost.id)
              ?.likeCount || 0,
          ),
          userId ? likes.some(like => like.postId === blogPost.id) : false,
          commafy(
            feedsCommentCount.find(comment => comment.postId === blogPost.id)
              ?.commentCount || 0,
          ),
          blogImages.filter(bi => bi.postId === blogPost.id),
        );
      }),
      isNext: isPageNext(
        blogPosts.pagination.page,
        blogPosts.pagination.take,
        blogPosts.pagination.total,
      ),
      total: blogPosts.pagination.total,
    };
  }

  private getFeedListTake(skip: number, take: number): number {
    if (+skip === 1) {
      if (+take < 2) {
        return 0;
      }
      return take - 1;
    } else {
      return take;
    }
  }

  private async getFeedListByUserLikes(
    postIds: number[],
    userId: number,
  ): Promise<BlogLike[]> {
    return await this.blogLikeRepository.selectFeedListByUserLikes(
      postIds,
      userId,
    );
  }

  private async getFeedListByUserInfo(userIds: number[]): Promise<User[]> {
    return await this.userRepository.selectUsers(userIds);
  }

  async getListFeedComment({
    id,
  }: GetListFeedCommentReqDTO): Promise<GetListFeedCommentResDTO[]> {
    try {
      let comment = await this.blogCommentRepository.getBlogCommentByPostId(id);
      comment = plainToInstance(GetListFeedCommentResDTO, comment);

      const result: GetListFeedCommentResDTO[] = await Promise.all(
        comment.map(async c => {
          if (c.replyCnt != 0) {
            const reply: GetBlogCommentDTO[] =
              await this.blogCommentRepository.getBlogCommentByCommentId(c.id);
            c.reply = plainToInstance(GetBlogCommentDTO, reply);
          }
          return c;
        }),
      );

      return result;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        {
          error: e.message,
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteBlogComment({id}: DelBlogCommentReqDTO) {
    try {
      const comment: BlogComment =
        await this.blogCommentRepository.getBlogComment(id);
      comment.isDeleted = true;
      comment.delDate = new Date();
      await this.blogCommentRepository.saveBlogComment(null, comment);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
