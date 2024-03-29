"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsModule = void 0;
const common_1 = require("@nestjs/common");
const promotions_service_1 = require("./promotions.service");
const promotions_controller_1 = require("./promotions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const promotions_repository_1 = require("./promotions.repository");
let PromotionsModule = class PromotionsModule {
};
PromotionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([promotions_repository_1.PromotionsRepository])],
        controllers: [promotions_controller_1.PromotionsController],
        providers: [promotions_service_1.PromotionsService],
    })
], PromotionsModule);
exports.PromotionsModule = PromotionsModule;
//# sourceMappingURL=promotions.module.js.map