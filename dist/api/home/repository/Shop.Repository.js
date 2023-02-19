"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRepository = void 0;
const Shop_1 = require("../../../entities/Shop");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ShopRepository = class ShopRepository extends typeorm_1.Repository {
    async selectVerifiedShops(isHome) {
        return await this.createQueryBuilder('shop')
            .where('shop.verifiedDate IS NOT NULL')
            .orderBy('shop.verifiedDate', 'DESC')
            .limit(isHome ? 5 : undefined)
            .getMany();
    }
};
ShopRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(Shop_1.Shop)
], ShopRepository);
exports.ShopRepository = ShopRepository;
//# sourceMappingURL=Shop.Repository.js.map