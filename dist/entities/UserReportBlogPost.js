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
exports.UserReportBlogPost = void 0;
const enum_1 = require("../shared/enums/enum");
const typeorm_1 = require("typeorm");
let UserReportBlogPost = class UserReportBlogPost {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserReportBlogPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id',
        primary: true,
        comment: '유저 아이디',
        nullable: false,
    }),
    __metadata("design:type", Number)
], UserReportBlogPost.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'post_id',
        primary: true,
        comment: '게시글 아이디',
        nullable: false,
    }),
    __metadata("design:type", Number)
], UserReportBlogPost.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'report_type',
        type: 'enum',
        enum: enum_1.REPORT_TYPE,
        comment: '신고사유 타입',
        nullable: false,
    }),
    __metadata("design:type", String)
], UserReportBlogPost.prototype, "reportType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'reg_date',
        type: 'timestamp',
        nullable: false,
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
        comment: '신고 시간',
    }),
    __metadata("design:type", Date)
], UserReportBlogPost.prototype, "regDate", void 0);
UserReportBlogPost = __decorate([
    (0, typeorm_1.Entity)('user_report_blog_post', { schema: 'knockknock' })
], UserReportBlogPost);
exports.UserReportBlogPost = UserReportBlogPost;
//# sourceMappingURL=UserReportBlogPost.js.map