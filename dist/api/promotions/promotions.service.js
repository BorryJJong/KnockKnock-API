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
exports.PromotionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const promotions_dto_1 = require("./dto/promotions.dto");
const promotions_repository_1 = require("./promotions.repository");
let PromotionsService = class PromotionsService {
    constructor(promotionsRepository) {
        this.promotionsRepository = promotionsRepository;
    }
    async getListPromotion() {
        const promotions = await this.promotionsRepository.selectPromotions();
        return promotions.map(p => new promotions_dto_1.GetPromotionResDTO(p.id, p.type));
    }
};
PromotionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promotions_repository_1.PromotionsRepository)),
    __metadata("design:paramtypes", [Object])
], PromotionsService);
exports.PromotionsService = PromotionsService;
//# sourceMappingURL=promotions.service.js.map