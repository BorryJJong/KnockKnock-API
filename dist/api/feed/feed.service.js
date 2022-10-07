"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const feed_dto_1 = require("./dto/feed.dto");
const image_service_1 = require("../image/image.service");
const blogChallenges_repository_1 = require("./repository/blogChallenges.repository");
const blogImage_repository_1 = require("./repository/blogImage.repository");
const blogPost_repository_1 = require("./repository/blogPost.repository");
const blogPromotion_repository_1 = require("./repository/blogPromotion.repository");
const blogComment_repository_1 = require("./repository/blogComment.repository");
const utils_1 = require("../../shared/utils");
let FeedService = FeedService_1 = class FeedService {
    constructor(blogPostRepository, blogChallengesRepository, blogPromotionRepository, blogImageRepository, blogCommentRepository, imageService, connection) {
        this.blogPostRepository = blogPostRepository;
        this.blogChallengesRepository = blogChallengesRepository;
        this.blogPromotionRepository = blogPromotionRepository;
        this.blogImageRepository = blogImageRepository;
        this.blogCommentRepository = blogCommentRepository;
        this.imageService = imageService;
        this.connection = connection;
        this.logger = new common_1.Logger(FeedService_1.name);
    }
    async create(files, createFeedDTO) {
        const queryRunner = this.connection.createQueryRunner();
        let result = false;
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const post = await this.savePost(queryRunner, createFeedDTO);
            const postId = post.id;
            await this.saveChallenges(queryRunner, postId, createFeedDTO.challenges);
            await this.savePromotion(queryRunner, postId, createFeedDTO.promotions);
            if (files !== undefined) {
                await Promise.all(files.map(async (file) => await this.savePostImage(queryRunner, postId, file)));
            }
            await queryRunner.commitTransaction();
            result = true;
        }
        catch (e) {
            this.logger.error(e);
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
        return result;
    }
    async savePost(queryRunner, createBlogPostDTO) {
        const post = this.blogPostRepository.createBlogPost(createBlogPostDTO);
        const returned = await this.blogPostRepository.saveBlogPost(queryRunner, post);
        return returned;
    }
    async saveChallenges(queryRunner, postId, challenges) {
        await Promise.all(challenges.split(',').map(async (id) => {
            const challenge = this.blogChallengesRepository.createBlogChallenges({
                postId: postId,
                challengeId: Number(id),
            });
            await this.blogChallengesRepository.saveBlogChallenges(queryRunner, challenge);
        }));
    }
    async savePromotion(queryRunner, postId, promotions) {
        await Promise.all(promotions.split(',').map(async (id) => {
            const promotion = this.blogPromotionRepository.createBlogPromotion({
                postId: postId,
                promotionId: Number(id),
            });
            await this.blogPromotionRepository.saveBlogPromotion(queryRunner, promotion);
        }));
    }
    async savePostImage(queryRunner, postId, file) {
        let resultS3 = null;
        try {
            resultS3 = await this.imageService.uploadS3(file, 'feed');
            if (!resultS3.ok) {
                throw new Error('S3 image upload failed');
            }
            const image = this.blogImageRepository.createBlogImage({
                postId: postId,
                fileUrl: resultS3.url,
            });
            await this.blogImageRepository.saveBlogImage(queryRunner, image);
        }
        catch (e) {
            if (resultS3.ok) {
                this.imageService.deleteS3(resultS3.Key);
            }
            throw new Error(e);
        }
    }
    async saveBlogComment(insBlogCommentDTO) {
        try {
            const comment = this.blogCommentRepository.createBlogComment(insBlogCommentDTO);
            await this.blogCommentRepository.saveBlogComment(null, comment);
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    async getFeed({ id }) {
        try {
            const post = await this.blogPostRepository.getBlogPostById(id);
            const promotions = await this.blogPromotionRepository.getBlogPromotionByPostId(id);
            const challenges = await this.blogChallengesRepository.getBlogChallengesByPostId(id);
            const images = await this.blogImageRepository.getBlogImageByPostId(id);
            const result = {
                feed: (0, class_transformer_1.plainToInstance)(feed_dto_1.GetBlogPostDTO, post),
                promotions: (0, class_transformer_1.plainToInstance)(feed_dto_1.GetBlogPromotionDTO, promotions),
                challenges: (0, class_transformer_1.plainToInstance)(feed_dto_1.GetBlogChallengesDTO, challenges),
                images: (0, class_transformer_1.plainToInstance)(feed_dto_1.GetBlogImageDTO, images),
            };
            return result;
        }
        catch (e) {
            this.logger.error(e);
            throw new Error(e);
        }
    }
    update(id, updateFeedDTO) {
        return `This action updates a #${id} feed`;
    }
    remove(id) {
        return `This action removes a #${id} feed`;
    }
    async getFeedsByChallengesFilter(query) {
        let blogPostIds = [];
        const blogChallenges = await this.blogChallengesRepository.getBlogChallengesByChallengeId(query.challengeId);
        if (blogChallenges.length > 0) {
            blogPostIds = blogChallenges.map(bc => bc.postId);
        }
        const blogPosts = await this.blogPostRepository.getBlogPosts(query.page, query.take, blogPostIds);
        const blogImages = await this.blogImageRepository.getBlogImagesByBlogPost(blogPosts.items.map(post => post.id));
        return {
            feeds: blogPosts.items.map(blogPost => {
                const filterBlogImages = blogImages.filter(blogImage => blogImage.postId === blogPost.id);
                const isImageMore = filterBlogImages.length > 1 ? true : false;
                const thumbnailUrl = filterBlogImages[0].fileUrl;
                return new feed_dto_1.GetFeedMainResDTO(blogPost.id, thumbnailUrl, isImageMore);
            }),
            isNext: (0, utils_1.isPageNext)(blogPosts.pagination.page, blogPosts.pagination.take, blogPosts.pagination.total),
            total: blogPosts.pagination.total,
        };
    }
    async getListFeed(query) {
        const { feedId: blogPostId, challengeId, page: skip, take } = query;
        const blogPost = await this.blogPostRepository.getBlogPost(blogPostId);
        let blogPostIds = [];
        if (challengeId) {
            const blogChallenges = await this.blogChallengesRepository.getBlogChallengesByChallengeId(challengeId);
            blogPostIds = blogChallenges.map(bc => bc.postId);
        }
        const blogPosts = await this.blogPostRepository.getListBlogPost(skip, take, blogPostIds, blogPost.id);
        blogPosts.items.unshift(blogPost);
        let blogImages = [];
        blogPostIds = blogPosts.items.map(bp => bp.id);
        if (blogPostIds.length > 0) {
            blogImages = await this.blogImageRepository.getBlogImagesByBlogPost(blogPostIds);
        }
        return {
            feeds: blogPosts.items.map((blogPost) => {
                return new feed_dto_1.GetFeedResDTO(blogPost.id, '녹녹제리다', 'https://github.com/hiong04', (0, utils_1.convertTimeToStr)(blogPost.regDate), '1:1', '1,301', true, '2,456', blogImages);
            }),
            isNext: (0, utils_1.isPageNext)(blogPosts.pagination.page, blogPosts.pagination.take, blogPosts.pagination.total),
            total: blogPosts.pagination.total,
        };
    }
};
FeedService = FeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blogPost_repository_1.BlogPostRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(blogChallenges_repository_1.BlogChallengesRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(blogPromotion_repository_1.BlogPromotionRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(blogImage_repository_1.BlogImageRepository)),
    __param(4, (0, typeorm_1.InjectRepository)(blogComment_repository_1.BlogCommentRepository)),
    __metadata("design:paramtypes", [Object, blogChallenges_repository_1.BlogChallengesRepository,
        blogPromotion_repository_1.BlogPromotionRepository,
        blogImage_repository_1.BlogImageRepository,
        blogComment_repository_1.BlogCommentRepository,
        image_service_1.ImageService,
        typeorm_2.Connection])
], FeedService);
exports.FeedService = FeedService;
//# sourceMappingURL=feed.service.js.map