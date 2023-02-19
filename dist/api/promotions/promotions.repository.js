"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const Promotions_1 = require("../../entities/Promotions");
let PromotionsRepository = class PromotionsRepository extends typeorm_1.Repository {
    async selectPromotions() {
        return this.createQueryBuilder('promotions').getMany();
    }
    async selectPromotionNames(ids) {
        if (ids.length < 0) {
            return [];
        }
        return await this.createQueryBuilder('promotions')
            .select('promotions.type', 'name')
            .where('promotions.id IN (:...ids)', {
            ids,
        })
            .getRawMany()
            .then(names => names.map(n => n.name));
    }
};
PromotionsRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(Promotions_1.Promotions)
], PromotionsRepository);
exports.PromotionsRepository = PromotionsRepository;
//# sourceMappingURL=promotions.repository.js.map