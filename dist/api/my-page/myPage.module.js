"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyPageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const myPage_controller_1 = require("./myPage.controller");
const myPage_service_1 = require("./myPage.service");
const users_repository_1 = require("../users/users.repository");
let MyPageModule = class MyPageModule {
};
MyPageModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_repository_1.UserRepository])],
        controllers: [myPage_controller_1.MyPageController],
        providers: [myPage_service_1.MyPageService],
    })
], MyPageModule);
exports.MyPageModule = MyPageModule;
//# sourceMappingURL=myPage.module.js.map