"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRepository = void 0;
const Banner_1 = require("../../../entities/Banner");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let BannerRepository = class BannerRepository extends typeorm_1.Repository {
    async selectBanners(type) {
        return await this.createQueryBuilder('banner')
            .where('banner.type = :type', {
            type,
        })
            .andWhere('banner.exposeDate <= NOW()')
            .andWhere('banner.expireDate >= NOW()')
            .orWhere('banner.expireDate IS NULL')
            .orderBy('banner.exposeDate', 'DESC')
            .getMany();
    }
};
BannerRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(Banner_1.Banner)
], BannerRepository);
exports.BannerRepository = BannerRepository;
//# sourceMappingURL=Banner.Repository.js.map