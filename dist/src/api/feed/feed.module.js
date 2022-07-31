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
const feed_service_1 = require("./feed.service");
const feed_controller_1 = require("./feed.controller");
const image_module_1 = require("../image/image.module");
const BlogChallenges_1 = require("../../entities/BlogChallenges");
const BlogImage_1 = require("../../entities/BlogImage");
const BlogPost_1 = require("../../entities/BlogPost");
const BlogPromotion_1 = require("../../entities/BlogPromotion");
const typeorm_1 = require("@nestjs/typeorm");
let FeedModule = class FeedModule {
};
FeedModule = __decorate([
    (0, common_1.Module)({
        controllers: [feed_controller_1.FeedController],
        providers: [feed_service_1.FeedService],
        imports: [
            image_module_1.ImageModule,
            typeorm_1.TypeOrmModule.forFeature([
                BlogChallenges_1.BlogChallenges,
                BlogImage_1.BlogImage,
                BlogPost_1.BlogPost,
                BlogPromotion_1.BlogPromotion,
            ]),
        ],
    })
], FeedModule);
exports.FeedModule = FeedModule;
//# sourceMappingURL=feed.module.js.map