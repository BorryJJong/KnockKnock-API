import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogChallenges } from 'src/entities/BlogChallenges';
import { BlogImage } from 'src/entities/BlogImage';
import { BlogPost } from 'src/entities/BlogPost';
import { BlogPromotion } from 'src/entities/BlogPromotion';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { ImageService } from 'src/image/image.service';
@Injectable()
export class FeedService {
  private readonly logger = new Logger(FeedService.name);

  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
    @InjectRepository(BlogChallenges)
    private blogChallengesRepository: Repository<BlogChallenges>,
    @InjectRepository(BlogPromotion)
    private blogPromotionRepository: Repository<BlogPromotion>,
    @InjectRepository(BlogImage)
    private blogImageRepository: Repository<BlogImage>,
    private readonly imageService: ImageService,
    private connection: Connection,
  ) {}

  async create(files: Express.Multer.File[], data: CreateFeedDto) {
    // TODO: queryRunner 더 잘쓸 수 있는 방안?
    const queryRunner = this.connection.createQueryRunner();
    let result = false;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. 포스트 저장
      let postId: number = await this.savePost(
        queryRunner,
        data.userId,
        data.content,
        data.storeAddress,
        data.locationX,
        data.locationY,
      );

      // 2. 챌린지 저장
      await this.saveChallenges(queryRunner, postId, data.challenges);

      // 3. 프로모션 저장
      await this.savePromotion(queryRunner, postId, data.promotions);

      // 4. 이미지 저장
      if (files !== undefined) {
        await Promise.all(
          files.map(
            async (file) => await this.saveImage(queryRunner, postId, file),
          ),
        );
        // await this.saveImage(queryRunner, postId, file);
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
    userId: number,
    content: string,
    storeAddress: string,
    locationX: string,
    locationY: string,
  ) {
    const post = await this.blogPostRepository.create({
      userId,
      content,
      storeAddress,
      locationX,
      locationY,
    });
    const returned = await queryRunner.manager.save(post);

    return returned.id;
  }

  async saveChallenges(
    queryRunner: QueryRunner,
    postId: number,
    challenges: string,
  ) {
    await Promise.all(
      challenges.split(',').map(async (id) => {
        let challenge = await this.blogChallengesRepository.create({
          postId,
          challengeId: Number(id),
        });
        await queryRunner.manager.save(challenge);
      }),
    );
  }

  async savePromotion(
    queryRunner: QueryRunner,
    postId: number,
    promotions: string,
  ) {
    await Promise.all(
      promotions.split(',').map(async (id) => {
        let promotion = await this.blogPromotionRepository.create({
          postId,
          promotionId: Number(id),
        });
        await queryRunner.manager.save(promotion);
      }),
    );
  }

  async saveImage(
    queryRunner: QueryRunner,
    postId: number,
    file: Express.Multer.File,
  ) {
    /*{
      ok: true,
      ETag: '"78c77202283e50fecd8eab89304a617b"',
      Key: '1646446656103sv90vbzqved.png', // 파일명
      url: 'https://kej-test.s3.ap-northeast-2.amazonaws.com/feed/1646446656103sv90vbzqved.png' // url
    }*/

    try {
      // 1. image s3 upload
      let resultS3 = await this.imageService.uploadS3(file, 'feed');

      if (!resultS3.ok) {
        throw new Error('S3 image upload failed');
      }

      // 2. save db
      let image = await this.blogImageRepository.create({
        postId,
        fileUrl: resultS3.url,
      });
      await queryRunner.manager.save(image);
    } catch (e) {
      // TODO: 1번성공 2번에러시 이미지 지워야함 함수는 만들어뒀으나 테스트필요
      // this.imageService.deleteS3
      throw new Error(e);
    }
  }

  findAll() {
    return `This action returns all feed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feed`;
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }
}
