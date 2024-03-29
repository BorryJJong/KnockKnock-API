"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const challenges_controller_1 = require("./challenges.controller");
const challenges_repository_1 = require("./challenges.repository");
const challenges_service_1 = require("./challenges.service");
let ChallengesModule = class ChallengesModule {
};
ChallengesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([challenges_repository_1.ChallengesRepository])],
        controllers: [challenges_controller_1.ChallengesController],
        providers: [challenges_service_1.ChallengesService, jwt_guard_1.JwtGuard],
    })
], ChallengesModule);
exports.ChallengesModule = ChallengesModule;
//# sourceMappingURL=challenges.module.js.map