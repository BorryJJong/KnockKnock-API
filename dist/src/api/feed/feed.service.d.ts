/// <reference types="multer" />
import { Connection, QueryRunner } from 'typeorm';
import { CreateFeedDTO, UpdateFeedDTO, CreateBlogPostDTO, GetListFeedReqDTO, GetListFeedResDTO } from './dto/feed.dto';
import { ImageService } from 'src/api/image/image.service';
import { BlogChallengesRepository } from './repository/blogChallenges.repository';
import { BlogImageRepository } from './repository/blogImage.repository';
import { BlogPostRepository } from './repository/blogPost.repository';
import { BlogPromotionRepository } from './repository/blogPromotion.repository';
export declare class FeedService {
    private blogPostRepository;
    private blogChallengesRepository;
    private blogPromotionRepository;
    private blogImageRepository;
    private readonly imageService;
    private connection;
    private readonly logger;
    constructor(blogPostRepository: BlogPostRepository, blogChallengesRepository: BlogChallengesRepository, blogPromotionRepository: BlogPromotionRepository, blogImageRepository: BlogImageRepository, imageService: ImageService, connection: Connection);
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO): Promise<boolean>;
    savePost(queryRunner: QueryRunner, createBlogPostDTO: CreateBlogPostDTO): Promise<import("../../entities/BlogPost").BlogPost>;
    saveChallenges(queryRunner: QueryRunner, postId: number, challenges: string): Promise<void>;
    savePromotion(queryRunner: QueryRunner, postId: number, promotions: string): Promise<void>;
    savePostImage(queryRunner: QueryRunner, postId: number, file: Express.Multer.File): Promise<void>;
    findOne(id: number): string;
    update(id: number, updateFeedDTO: UpdateFeedDTO): string;
    remove(id: number): string;
    getFeedsByChallengesFilter(query: GetListFeedReqDTO): Promise<GetListFeedResDTO>;
}
