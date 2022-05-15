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
exports.BlogComment = void 0;
const typeorm_1 = require("typeorm");
let BlogComment = class BlogComment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id", comment: "아이디" }),
    __metadata("design:type", Number)
], BlogComment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "post_id", comment: "게시글 아이디" }),
    __metadata("design:type", Number)
], BlogComment.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "user_id", comment: "사용자 아이디" }),
    __metadata("design:type", Number)
], BlogComment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "content", comment: "내용" }),
    __metadata("design:type", String)
], BlogComment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "comment_id",
        nullable: true,
        comment: "리댓글 대상(?) 댓글 pk",
    }),
    __metadata("design:type", Number)
], BlogComment.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "reg_date", comment: "등록 날짜" }),
    __metadata("design:type", Date)
], BlogComment.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", {
        name: "del_date",
        nullable: true,
        comment: "삭제 날짜",
    }),
    __metadata("design:type", Date)
], BlogComment.prototype, "delDate", void 0);
__decorate([
    (0, typeorm_1.Column)("char", {
        name: "Is_deleted",
        nullable: true,
        comment: "삭제 여부",
        length: 1,
        default: () => "'N'",
    }),
    __metadata("design:type", String)
], BlogComment.prototype, "isDeleted", void 0);
BlogComment = __decorate([
    (0, typeorm_1.Entity)("blog_comment", { schema: "knockknock" })
], BlogComment);
exports.BlogComment = BlogComment;
//# sourceMappingURL=BlogComment.js.map