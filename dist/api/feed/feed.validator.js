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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedValidator = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blogComment_repository_1 = require("./repository/blogComment.repository");
const blogPost_repository_1 = require("./repository/blogPost.repository");
const users_repository_1 = require("../users/users.repository");
let FeedValidator = class FeedValidator {
    constructor(blogPostRepository, blogCommentRepository, userRepository) {
        this.blogPostRepository = blogPostRepository;
        this.blogCommentRepository = blogCommentRepository;
        this.userRepository = userRepository;
    }
    async checkFeedAuthor(id, userId) {
        const response = await this.blogPostRepository.selectBlogPostByUser(id, userId);
        if (!response) {
            throw new common_1.HttpException({
                message: '게시글 삭제 권한이 없습니다',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async checkFeedCommentAuthor(id, userId) {
        const response = await this.blogCommentRepository.selectBlogPostCommentByUser(id, userId);
        if (!response) {
            throw new common_1.HttpException({
                message: '댓글 삭제 권한이 없습니다',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async checkPermissionCreateFeed(userId) {
        const user = await this.userRepository.selectUser(userId);
        if (!user) {
            throw new common_1.HttpException({
                message: '피드 등록 권한이 없습니다',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async checkPermissionUpdateFeed(id, userId) {
        const user = await this.blogPostRepository.selectBlogPostByUser(id, userId);
        if (!user) {
            throw new common_1.HttpException({
                message: '피드 수정 권한이 없습니다',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
FeedValidator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blogPost_repository_1.BlogPostRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(blogComment_repository_1.BlogCommentRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(users_repository_1.UserRepository)),
    __metadata("design:paramtypes", [Object, blogComment_repository_1.BlogCommentRepository, Object])
], FeedValidator);
exports.FeedValidator = FeedValidator;
//# sourceMappingURL=feed.validator.js.map