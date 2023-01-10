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
const like_repository_1 = require("../like/repository/like.repository");
const users_repository_1 = require("../users/users.repository");
let FeedService = FeedService_1 = class FeedService {
    constructor(imageService, connection, blogPostRepository, blogChallengesRepository, blogPromotionRepository, blogImageRepository, blogCommentRepository, blogLikeRepository, userRepository) {
        this.imageService = imageService;
        this.connection = connection;
        this.blogPostRepository = blogPostRepository;
        this.blogChallengesRepository = blogChallengesRepository;
        this.blogPromotionRepository = blogPromotionRepository;
        this.blogImageRepository = blogImageRepository;
        this.blogCommentRepository = blogCommentRepository;
        this.blogLikeRepository = blogLikeRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(FeedService_1.name);
    }
    async create(files, createFeedDTO, userId) {
        const queryRunner = this.connection.createQueryRunner();
        let result = false;
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const post = await this.savePost(queryRunner, createFeedDTO, userId);
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
    async savePost(queryRunner, createBlogPostDTO, userId) {
        const post = this.blogPostRepository.createBlogPost(createBlogPostDTO, userId);
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
                throw new common_1.HttpException({
                    error: 'S3 image upload failed',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new common_1.HttpException({
                error: e.message,
                message: e.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async saveBlogComment(insBlogCommentDTO, userId) {
        try {
            const comment = this.blogCommentRepository.createBlogComment(insBlogCommentDTO, userId);
            await this.blogCommentRepository.saveBlogComment(null, comment);
        }
        catch (e) {
            throw new common_1.HttpException({
                error: e.message,
                message: e.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getFeed({ id }, userId) {
        try {
            const post = await this.blogPostRepository.getBlogPostById(id, userId);
            const promotions = await this.blogPromotionRepository.getBlogPromotionByPostId(id);
            const challenges = await this.blogChallengesRepository.getBlogChallengesByPostId(id);
            const images = await this.blogImageRepository.getBlogImageByPostId(id);
            const result = {
                feed: (0, class_transformer_1.plainToInstance)(feed_dto_1.GetBlogPostDTO, post),
                promotions: (0, class_transformer_1.plainToInstance)(feed_dto_1.GetBlogPromotionDTO, promotions),
                challenges: (0, class_transformer_1.plainToInstance)(feed_dto_1.GetBlogChallengesDTO, challenges),
                images: (0, class_transformer_1.plainToInstance)(feed_dto_1.GetBlogImageDTO, images),
            };
            await this.blogPostRepository.updateBlogPostHits(id);
            return result;
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.HttpException({
                error: e.message,
                message: e.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(updateFeedDTO) {
        const queryRunner = this.connection.createQueryRunner();
        let result = false;
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const postId = updateFeedDTO.id;
            const post = await this.updatePost(queryRunner, postId, updateFeedDTO);
            await this.updateChallenges(queryRunner, postId, updateFeedDTO.challenges);
            await this.updatePromotion(queryRunner, postId, updateFeedDTO.promotions);
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
    async updatePost(queryRunner, postId, updateBlogPostDTO) {
        const post = this.blogPostRepository.createBlogPost(updateBlogPostDTO);
        post.modDate = new Date();
        const returned = await this.blogPostRepository.updateBlogPost(queryRunner, postId, post);
        return returned;
    }
    async updateChallenges(queryRunner, postId, challenges) {
        await this.blogChallengesRepository.deleteBlogChallengesByPostId(queryRunner, postId);
        await Promise.all(challenges.split(',').map(async (id) => {
            const challenge = this.blogChallengesRepository.createBlogChallenges({
                postId: postId,
                challengeId: Number(id),
            });
            await this.blogChallengesRepository.saveBlogChallenges(queryRunner, challenge);
        }));
    }
    async updatePromotion(queryRunner, postId, promotions) {
        await this.blogPromotionRepository.deleteBlogPromotionByPostId(queryRunner, postId);
        await Promise.all(promotions.split(',').map(async (id) => {
            const promotion = this.blogPromotionRepository.createBlogPromotion({
                postId: postId,
                promotionId: Number(id),
            });
            await this.blogPromotionRepository.saveBlogPromotion(queryRunner, promotion);
        }));
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
    async getListFeed(query, userId) {
        const { feedId: blogPostId, challengeId, page: skip, take } = query;
        let excludeBlogPostId;
        let selectBlogPost;
        if (+skip === 1) {
            selectBlogPost = await this.blogPostRepository.getBlogPost(blogPostId);
            excludeBlogPostId = selectBlogPost.id;
        }
        let blogPostIds = [];
        if (+challengeId) {
            const blogChallenges = await this.blogChallengesRepository.getBlogChallengesByChallengeId(challengeId);
            blogPostIds = blogChallenges.map(bc => bc.postId);
        }
        const blogPosts = await this.blogPostRepository.getListBlogPost(skip, this.getFeedListTake(skip, take), blogPostIds, excludeBlogPostId, userId);
        if (+skip === 1) {
            blogPosts.items.unshift(selectBlogPost);
        }
        let blogImages = [];
        blogPostIds = blogPosts.items.map(bp => bp.id);
        if (blogPostIds.length > 0) {
            blogImages = await this.blogImageRepository.getBlogImagesByBlogPost(blogPostIds);
        }
        const feedsCommentCount = await this.blogCommentRepository.selectFeedsByCommentCount(blogPostIds);
        const feedsLikeCount = await this.blogLikeRepository.selectFeedsByLikeCount(blogPostIds);
        let likes = [];
        if (userId) {
            likes = await this.getFeedListByUserLikes(blogPostIds, userId);
        }
        const findUsers = await this.getFeedListByUserInfo(blogPosts.items.map(b => b.userId));
        return {
            feeds: blogPosts.items.map((blogPost) => {
                var _a, _b;
                const defaultImageRatio = '1:1';
                const writer = findUsers.find(user => user.id === blogPost.userId);
                const commentCount = ((_a = feedsCommentCount.find(comment => comment.postId === blogPost.id)) === null || _a === void 0 ? void 0 : _a.commentCount) || 0;
                const likeCount = ((_b = feedsLikeCount.find(like => like.postId === blogPost.id)) === null || _b === void 0 ? void 0 : _b.likeCount) ||
                    0;
                const isLike = userId
                    ? likes.some(like => like.postId === blogPost.id)
                    : false;
                const images = blogImages.filter(bi => bi.postId === blogPost.id);
                const isWriter = userId === blogPost.userId;
                return new feed_dto_1.GetFeedResDTO(blogPost.id, writer.nickname, writer.image, blogPost.content, (0, utils_1.convertTimeToStr)(blogPost.regDate), defaultImageRatio, (0, utils_1.commafy)(likeCount), isLike, (0, utils_1.commafy)(commentCount), images, isWriter);
            }),
            isNext: true,
            total: blogPosts.pagination.total,
        };
    }
    getFeedListTake(skip, take) {
        if (+skip === 1) {
            if (+take < 2) {
                return 0;
            }
            return take - 1;
        }
        else {
            return take;
        }
    }
    async getFeedListByUserLikes(postIds, userId) {
        return await this.blogLikeRepository.selectFeedListByUserLikes(postIds, userId);
    }
    async getFeedListByUserInfo(userIds) {
        return await this.userRepository.selectUsers(userIds);
    }
    async getListFeedComment({ id }, userId) {
        try {
            let comments = await this.blogCommentRepository.getBlogCommentByPostId(id);
            comments = (0, class_transformer_1.plainToInstance)(feed_dto_1.GetListFeedCommentResDTO, comments);
            const result = await Promise.all(comments.map(async (comment) => {
                if (comment.replyCnt != 0) {
                    const reply = await this.blogCommentRepository.getBlogCommentByCommentId(comment.id);
                    reply.map((r, index) => (reply[index].isWriter = this.isFeedCommentWriter(r.userId, userId)));
                    comment.reply = (0, class_transformer_1.plainToInstance)(feed_dto_1.GetBlogCommentDTO, reply);
                }
                comment.isWriter = this.isFeedCommentWriter(comment.userId, userId);
                return comment;
            }));
            return result;
        }
        catch (e) {
            throw new common_1.HttpException({
                error: e.message,
                message: e.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    isFeedCommentWriter(writerId, requestUserId) {
        return writerId === requestUserId;
    }
    async deleteBlogComment({ id }) {
        try {
            const comment = await this.blogCommentRepository.getBlogComment(id);
            comment.isDeleted = true;
            comment.delDate = new Date();
            await this.blogCommentRepository.saveBlogComment(null, comment);
        }
        catch (e) {
            throw new common_1.HttpException({
                error: e.message,
                message: e.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete({ id }) {
        try {
            await this.blogPostRepository.deleteBlogPost(id);
        }
        catch (error) {
            throw new common_1.HttpException({
                error: error.message,
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
FeedService = FeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(blogPost_repository_1.BlogPostRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(blogChallenges_repository_1.BlogChallengesRepository)),
    __param(4, (0, typeorm_1.InjectRepository)(blogPromotion_repository_1.BlogPromotionRepository)),
    __param(5, (0, typeorm_1.InjectRepository)(blogImage_repository_1.BlogImageRepository)),
    __param(6, (0, typeorm_1.InjectRepository)(blogComment_repository_1.BlogCommentRepository)),
    __param(7, (0, typeorm_1.InjectRepository)(like_repository_1.BlogLikeRepository)),
    __param(8, (0, typeorm_1.InjectRepository)(users_repository_1.UserRepository)),
    __metadata("design:paramtypes", [image_service_1.ImageService,
        typeorm_2.Connection, Object, blogChallenges_repository_1.BlogChallengesRepository,
        blogPromotion_repository_1.BlogPromotionRepository,
        blogImage_repository_1.BlogImageRepository,
        blogComment_repository_1.BlogCommentRepository,
        like_repository_1.BlogLikeRepository,
        users_repository_1.UserRepository])
], FeedService);
exports.FeedService = FeedService;
//# sourceMappingURL=feed.service.js.map