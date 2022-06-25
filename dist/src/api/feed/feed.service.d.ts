/// <reference types="multer" />
import { Repository, Connection, QueryRunner } from 'typeorm';
import { CreateFeedDto } from './dto/feed.dto';
import { UpdateFeedDto } from './dto/feed.dto';
import { ImageService } from 'src/api/image/image.service';
import { BlogPost } from '../../entities/BlogPost';
import { BlogChallenges } from '../../entities/BlogChallenges';
import { BlogPromotion } from '../../entities/BlogPromotion';
import { BlogImage } from '../../entities/BlogImage';
export declare class FeedService {
    private blogPostRepository;
    private blogChallengesRepository;
    private blogPromotionRepository;
    private blogImageRepository;
    private readonly imageService;
    private connection;
    private readonly logger;
    constructor(blogPostRepository: Repository<BlogPost>, blogChallengesRepository: Repository<BlogChallenges>, blogPromotionRepository: Repository<BlogPromotion>, blogImageRepository: Repository<BlogImage>, imageService: ImageService, connection: Connection);
    create(files: Express.Multer.File[], data: CreateFeedDto): Promise<boolean>;
    savePost(queryRunner: QueryRunner, userId: number, content: string, storeAddress?: string, locationX?: string, locationY?: string): Promise<number>;
    saveChallenges(queryRunner: QueryRunner, postId: number, challenges: string): Promise<void>;
    savePromotion(queryRunner: QueryRunner, postId: number, promotions: string): Promise<void>;
    saveImage(queryRunner: QueryRunner, postId: number, file: Express.Multer.File): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFeedDto: UpdateFeedDto): string;
    remove(id: number): string;
}
