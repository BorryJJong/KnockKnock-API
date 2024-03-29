"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const challenges_module_1 = require("./api/challenges/challenges.module");
const orm_1 = require("./config/orm");
const users_module_1 = require("./api/users/users.module");
const feed_module_1 = require("./api/feed/feed.module");
const promotions_module_1 = require("./api/promotions/promotions.module");
const like_module_1 = require("./api/like/like.module");
const myPage_module_1 = require("./api/my-page/myPage.module");
const home_module_1 = require("./api/home/home.module");
const core_1 = require("@nestjs/core");
const HttpException_Filter_1 = require("./shared/filter/HttpException.Filter");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(orm_1.ormConfig),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            feed_module_1.FeedModule,
            promotions_module_1.PromotionsModule,
            challenges_module_1.ChallengesModule,
            like_module_1.LikeModule,
            myPage_module_1.MyPageModule,
            home_module_1.HomeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: HttpException_Filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map