import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, Connection, QueryRunner} from 'typeorm';
import {
  CreateFeedDTO,
  UpdateFeedDTO,
  CreateBlogPostDTO,
  CreateBlogChallengesDTO,
} from './dto/feed.dto';
import {ImageService} from 'src/api/image/image.service';
import {BlogChallengesRepository} from './blogChallenges.repository';
import {BlogImageRepository} from './blogImage.repository';
import {BlogPostRepository} from './blogPost.repository';
import {BlogPromotionRepository} from './blogPromotion.repository';
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

  findAll() {
    return `This action returns all feed`;
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
}
