"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blogPost_repository_1 = require("../feed/repository/blogPost.repository");
const blogPromotion_repository_1 = require("../feed/repository/blogPromotion.repository");
const home_controller_1 = require("./home.controller");
const home_service_1 = require("./home.service");
const Banner_Repository_1 = require("./repository/Banner.Repository");
const Event_Repository_1 = require("./repository/Event.Repository");
const Shop_Repository_1 = require("./repository/Shop.Repository");
const image_module_1 = require("../image/image.module");
const promotions_repository_1 = require("../promotions/promotions.repository");
let HomeModule = class HomeModule {
};
HomeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            image_module_1.ImageModule,
            typeorm_1.TypeOrmModule.forFeature([
                blogPost_repository_1.BlogPostRepository,
                Event_Repository_1.EventRepository,
                Banner_Repository_1.BannerRepository,
                Shop_Repository_1.ShopRepository,
                blogPromotion_repository_1.BlogPromotionRepository,
                promotions_repository_1.PromotionsRepository,
            ]),
        ],
        controllers: [home_controller_1.HomeController],
        providers: [home_service_1.HomeService],
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map