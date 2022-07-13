import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Connection, QueryRunner} from 'typeorm';
import {
  CreateFeedDTO,
  UpdateFeedDTO,
  CreateBlogPostDTO,
  GetListFeedReqDTO,
  GetListFeedResDTO,
  GetFeedResDTO,
  InsBlogCommentDTO,
  GetListFeedCommentReqDTO,
  GetListFeedCommentResDTO,
  GetBlogCommentDTO,
} from './dto/feed.dto';
import {ImageService} from 'src/api/image/image.service';
import {BlogChallengesRepository} from './repository/blogChallenges.repository';
import {BlogImageRepository} from './repository/blogImage.repository';
import {BlogPostRepository} from './repository/blogPost.repository';
import {BlogPromotionRepository} from './repository/blogPromotion.repository';
import {IGetBlogImagesByBlogPost} from './interface/blogImage.interface';
import { BlogCommentRepository } from './repository/blogComment.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FeedService {
  private readonly logger = new Logger(FeedService.name);

  constructor(
    @InjectRepository(BlogPostRepository)
    private blogPostRepository: BlogPostRepository,
    @InjectRepository(BlogChallengesRepository)
    private blogChallengesRepository: BlogChallengesRepository,
    @InjectRepository(BlogPromotionRepository)
    private blogPromotionRepository: BlogPromotionRepository,
    @InjectRepository(BlogImageRepository)
    private blogImageRepository: BlogImageRepository,
    @InjectRepository(BlogCommentRepository)
    private blogCommentRepository: BlogCommentRepository,
    private readonly imageService: ImageService,
    private connection: Connection,
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
        throw new Error('S3 image upload failed');
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
      throw new Error(e);
    }
  }

  async saveBlogComment(insBlogCommentDTO: InsBlogCommentDTO) {
    try{
      const comment = this.blogCommentRepository.createBlogComment(insBlogCommentDTO);
      await this.blogCommentRepository.saveBlogComment(null, comment);
    } catch (e) {
      throw new Error(e.message);
    }
  }
  
  findOne(id: number) {
    return `This action returns a #${id} feed`;
  }

  update(id: number, updateFeedDTO: UpdateFeedDTO) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }

  public async getFeedsByChallengesFilter(
    query: GetListFeedReqDTO,
  ): Promise<GetListFeedResDTO> {
    let blogPostIds: number[] = [];
    const blogChallenges =
      await this.blogChallengesRepository.getBlogChallengesByChallengeId(
        query.challengeId,
      );

    if (blogChallenges.length > 0) {
      blogPostIds = blogChallenges.map(bc => bc.postId);
    }

    const blogPosts = await this.blogPostRepository.getBlogPosts(
      query.skip,
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

        return new GetFeedResDTO(blogPost.id, thumbnailUrl, isImageMore);
      }),
      isNext:
        blogPosts.pagination.total >
        blogPosts.pagination.skip + blogPosts.pagination.take,
      total: blogPosts.pagination.total,
    };
  }

  async getListFeedComment({id}: GetListFeedCommentReqDTO): Promise<GetListFeedCommentResDTO[]>{
    try{
      let comment = await this.blogCommentRepository.getBlogCommentByPostId(id);
      comment = plainToInstance(GetListFeedCommentResDTO, comment);
      
      const result:GetListFeedCommentResDTO[] = await Promise.all(
        comment.map(async c => {
          if(c.replyCnt != 0){
            let reply:GetBlogCommentDTO[] = await this.blogCommentRepository.getBlogCommentByCommentId(c.id);
            c.reply = plainToInstance(GetBlogCommentDTO, reply);
          }
          return c;
        })
      )

      return result;
    } catch (e) {
      this.logger.error(e);
      throw new Error(e);
    }
  }
}
