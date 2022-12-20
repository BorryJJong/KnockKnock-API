"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const feed_service_1 = require("./feed.service");
const feed_controller_1 = require("./feed.controller");
const image_module_1 = require("../image/image.module");
const blogChallenges_repository_1 = require("./repository/blogChallenges.repository");
const blogImage_repository_1 = require("./repository/blogImage.repository");
const blogPost_repository_1 = require("./repository/blogPost.repository");
const blogPromotion_repository_1 = require("./repository/blogPromotion.repository");
const blogComment_repository_1 = require("./repository/blogComment.repository");
const jwtNoneRequired_guard_1 = require("../../auth/jwt/jwtNoneRequired.guard");
const like_repository_1 = require("../like/repository/like.repository");
const users_repository_1 = require("../users/users.repository");
const feed_validator_1 = require("./feed.validator");
let FeedModule = class FeedModule {
};
FeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            image_module_1.ImageModule,
            typeorm_1.TypeOrmModule.forFeature([
                blogChallenges_repository_1.BlogChallengesRepository,
                blogImage_repository_1.BlogImageRepository,
                blogPost_repository_1.BlogPostRepository,
                blogPromotion_repository_1.BlogPromotionRepository,
                blogComment_repository_1.BlogCommentRepository,
                like_repository_1.BlogLikeRepository,
                users_repository_1.UserRepository,
            ]),
        ],
        controllers: [feed_controller_1.FeedController],
        providers: [feed_service_1.FeedService, jwtNoneRequired_guard_1.JwtOptionalGuard, feed_validator_1.FeedValidator],
    })
], FeedModule);
exports.FeedModule = FeedModule;
//# sourceMappingURL=feed.module.js.map