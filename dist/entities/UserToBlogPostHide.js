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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToBlogPostHide = void 0;
const typeorm_1 = require("typeorm");
let UserToBlogPostHide = class UserToBlogPostHide {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserToBlogPostHide.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id',
        primary: true,
        comment: '유저 아이디',
        nullable: false,
    }),
    __metadata("design:type", Number)
], UserToBlogPostHide.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'post_id',
        primary: true,
        comment: '게시글 아이디',
        nullable: false,
    }),
    __metadata("design:type", Number)
], UserToBlogPostHide.prototype, "postId", void 0);
UserToBlogPostHide = __decorate([
    (0, typeorm_1.Entity)('user_to_blog_post_hide', { schema: 'knockknock' })
], UserToBlogPostHide);
exports.UserToBlogPostHide = UserToBlogPostHide;
//# sourceMappingURL=UserToBlogPostHide.js.map