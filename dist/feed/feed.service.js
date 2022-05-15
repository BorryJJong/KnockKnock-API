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
const BlogChallenges_1 = require("../entities/BlogChallenges");
const BlogImage_1 = require("../entities/BlogImage");
const BlogPost_1 = require("../entities/BlogPost");
const BlogPromotion_1 = require("../entities/BlogPromotion");
const typeorm_2 = require("typeorm");
const image_service_1 = require("../image/image.service");
let FeedService = FeedService_1 = class FeedService {
    constructor(blogPostRepository, blogChallengesRepository, blogPromotionRepository, blogImageRepository, imageService, connection) {
        this.blogPostRepository = blogPostRepository;
        this.blogChallengesRepository = blogChallengesRepository;
        this.blogPromotionRepository = blogPromotionRepository;
        this.blogImageRepository = blogImageRepository;
        this.imageService = imageService;
        this.connection = connection;
        this.logger = new common_1.Logger(FeedService_1.name);
    }
    async create(files, data) {
        const queryRunner = this.connection.createQueryRunner();
        let result = false;
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let postId = await this.savePost(queryRunner, data.userId, data.content, data.storeAddress, data.locationX, data.locationY);
            await this.saveChallenges(queryRunner, postId, data.challenges);
            await this.savePromotion(queryRunner, postId, data.promotions);
            if (files !== undefined) {
                await Promise.all(files.map(async (file) => await this.saveImage(queryRunner, postId, file)));
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
    async savePost(queryRunner, userId, content, storeAddress, locationX, locationY) {
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
    async saveChallenges(queryRunner, postId, challenges) {
        await Promise.all(challenges.split(',').map(async (id) => {
            let challenge = await this.blogChallengesRepository.create({
                postId,
                challengeId: Number(id),
            });
            await queryRunner.manager.save(challenge);
        }));
    }
    async savePromotion(queryRunner, postId, promotions) {
        await Promise.all(promotions.split(',').map(async (id) => {
            let promotion = await this.blogPromotionRepository.create({
                postId,
                promotionId: Number(id),
            });
            await queryRunner.manager.save(promotion);
        }));
    }
    async saveImage(queryRunner, postId, file) {
        let resultS3 = null;
        try {
            resultS3 = await this.imageService.uploadS3(file, 'feed');
            if (!resultS3.ok) {
                throw new Error('S3 image upload failed');
            }
            let image = await this.blogImageRepository.create({
                postId,
                fileUrl: resultS3.url,
            });
            await queryRunner.manager.save(image);
        }
        catch (e) {
            if (resultS3.ok) {
                this.imageService.deleteS3(resultS3.Key);
            }
            throw new Error(e);
        }
    }
    findAll() {
        return `This action returns all feed`;
    }
    findOne(id) {
        return `This action returns a #${id} feed`;
    }
    update(id, updateFeedDto) {
        return `This action updates a #${id} feed`;
    }
    remove(id) {
        return `This action removes a #${id} feed`;
    }
};
FeedService = FeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BlogPost_1.BlogPost)),
    __param(1, (0, typeorm_1.InjectRepository)(BlogChallenges_1.BlogChallenges)),
    __param(2, (0, typeorm_1.InjectRepository)(BlogPromotion_1.BlogPromotion)),
    __param(3, (0, typeorm_1.InjectRepository)(BlogImage_1.BlogImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        image_service_1.ImageService,
        typeorm_2.Connection])
], FeedService);
exports.FeedService = FeedService;
//# sourceMappingURL=feed.service.js.map