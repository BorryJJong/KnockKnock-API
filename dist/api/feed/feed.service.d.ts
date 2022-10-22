/// <reference types="multer" />
import { Connection, QueryRunner } from 'typeorm';
import { CreateFeedDTO, UpdateFeedDTO, CreateBlogPostDTO, GetListFeedMainReqDTO, GetListFeedMainResDTO, GetListFeedReqQueryDTO, GetListFeedResDTO, InsBlogCommentDTO, GetFeedViewReqDTO, GetFeedViewResDTO, GetListFeedCommentReqDTO, GetListFeedCommentResDTO } from './dto/feed.dto';
import { ImageService } from 'src/api/image/image.service';
import { BlogChallengesRepository } from './repository/blogChallenges.repository';
import { BlogImageRepository } from './repository/blogImage.repository';
import { BlogPromotionRepository } from './repository/blogPromotion.repository';
import { BlogCommentRepository } from './repository/blogComment.repository';
import { IBlogPostRepository } from './interface/blogPost.interface';
import { BlogPost } from '@entities/BlogPost';
export declare class FeedService {
    private blogPostRepository;
    private blogChallengesRepository;
    private blogPromotionRepository;
    private blogImageRepository;
    private blogCommentRepository;
    private readonly imageService;
    private connection;
    private readonly logger;
    constructor(blogPostRepository: IBlogPostRepository, blogChallengesRepository: BlogChallengesRepository, blogPromotionRepository: BlogPromotionRepository, blogImageRepository: BlogImageRepository, blogCommentRepository: BlogCommentRepository, imageService: ImageService, connection: Connection);
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO): Promise<boolean>;
    savePost(queryRunner: QueryRunner, createBlogPostDTO: CreateBlogPostDTO): Promise<BlogPost>;
    saveChallenges(queryRunner: QueryRunner, postId: number, challenges: string): Promise<void>;
    savePromotion(queryRunner: QueryRunner, postId: number, promotions: string): Promise<void>;
    savePostImage(queryRunner: QueryRunner, postId: number, file: Express.Multer.File): Promise<void>;
    saveBlogComment(insBlogCommentDTO: InsBlogCommentDTO): Promise<void>;
    getFeed({ id }: GetFeedViewReqDTO): Promise<GetFeedViewResDTO>;
    update(id: number, updateFeedDTO: UpdateFeedDTO): string;
    remove(id: number): string;
    getFeedsByChallengesFilter(query: GetListFeedMainReqDTO): Promise<GetListFeedMainResDTO>;
    getListFeed(query: GetListFeedReqQueryDTO): Promise<GetListFeedResDTO>;
    private getFeedListTake;
    getListFeedComment({ id, }: GetListFeedCommentReqDTO): Promise<GetListFeedCommentResDTO[]>;
}
