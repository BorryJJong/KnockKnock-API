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
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("../../shared/enums/enum");
const utils_1 = require("../../shared/utils");
const date_fns_1 = require("date-fns");
const blogPost_repository_1 = require("../feed/repository/blogPost.repository");
const home_dto_1 = require("./dto/home.dto");
const Banner_Repository_1 = require("./repository/Banner.Repository");
const Event_Repository_1 = require("./repository/Event.Repository");
const Shop_Repository_1 = require("./repository/Shop.Repository");
const image_service_1 = require("../image/image.service");
const promotions_repository_1 = require("../promotions/promotions.repository");
let HomeService = class HomeService {
    constructor(blogPostRepository, eventRepository, bannerRepository, shopRepository, promotionsRepository, imageService) {
        this.blogPostRepository = blogPostRepository;
        this.eventRepository = eventRepository;
        this.bannerRepository = bannerRepository;
        this.shopRepository = shopRepository;
        this.promotionsRepository = promotionsRepository;
        this.imageService = imageService;
    }
    async getListHotFeed(challengeId) {
        return this.blogPostRepository.selectBlogPostByHotFeeds(challengeId);
    }
    async getHomeListEvent() {
        const events = await this.eventRepository.selectEvents(true);
        return events.map(event => {
            return new home_dto_1.GetHomeListEventResDTO(event.id, this.getIsNewBadge(event.regDate), event.title, this.makeEventPeriod(event.startDate, event.endDate), this.imageService.getFileFullUrl(enum_1.S3_OBJECT.EVENT, event.image));
        });
    }
    getIsNewBadge(regDate) {
        return (0, date_fns_1.isAfter)(regDate, (0, date_fns_1.subDays)(new Date(), 14));
    }
    makeEventPeriod(startDate, endDate) {
        return `${(0, utils_1.dateFormatV2)(startDate)} ~ ${endDate ? (0, utils_1.dateFormatV2)(endDate) : '미정'}`;
    }
    async getListEvent(query) {
        const { eventTap } = query;
        const events = await this.eventRepository.selectEvents(false, eventTap);
        return events.map(event => {
            return new home_dto_1.GetListEventResDTO(event.id, this.getIsNewBadge(event.regDate), query.eventTap === enum_1.EVENT_TAP.END, event.title, this.makeEventPeriod(event.startDate, event.endDate), this.imageService.getFileFullUrl(enum_1.S3_OBJECT.EVENT, event.image), event.url);
        });
    }
    async getListBanner(query) {
        const { bannerType } = query;
        const banners = await this.bannerRepository.selectBanners(bannerType);
        return banners.map(b => {
            return new home_dto_1.GetListBannerResDTO(b.id, b.image, b.type, b.targetScreen);
        });
    }
    async getHomeListVerifiedShop() {
        const shops = await this.shopRepository.selectVerifiedShops(true);
        return Promise.all(shops.map(async (shop) => {
            const shopPromotionNames = await this.promotionsRepository.selectPromotionNames(shop.promotionIds);
            return new home_dto_1.GetHomeListVerifiredShopResDTO(shop.name, shop.description, this.imageService.getFileFullUrl(enum_1.S3_OBJECT.SHOP, shop.image), shopPromotionNames);
        }));
    }
    async getListVerifiedShop() {
        const shops = await this.shopRepository.selectVerifiedShops(false);
        return Promise.all(shops.map(async (shop) => {
            const shopPromotionNames = await this.promotionsRepository.selectPromotionNames(shop.promotionIds);
            return new home_dto_1.GetListVerifiredShopResDTO(shop.id, shop.name, shop.description, this.imageService.getFileFullUrl(enum_1.S3_OBJECT.SHOP, shop.image), shopPromotionNames, shop.url, shop.locationX, shop.locationY);
        }));
    }
};
HomeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blogPost_repository_1.BlogPostRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(Event_Repository_1.EventRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(Banner_Repository_1.BannerRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(Shop_Repository_1.ShopRepository)),
    __param(4, (0, typeorm_1.InjectRepository)(promotions_repository_1.PromotionsRepository)),
    __metadata("design:paramtypes", [blogPost_repository_1.BlogPostRepository, Object, Object, Object, Object, image_service_1.ImageService])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map