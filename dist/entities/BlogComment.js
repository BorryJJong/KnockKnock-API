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
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let BlogComment = class BlogComment {
    beforeInsert() {
        this.regDate = new Date();
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '댓글 id',
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BlogComment.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '게시글 id',
        example: 1,
    }),
    (0, typeorm_1.Column)({
        name: 'post_id',
        type: 'int',
        comment: '게시글 id',
        nullable: false,
    }),
    __metadata("design:type", Number)
], BlogComment.prototype, "postId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 id',
        example: 1,
    }),
    (0, typeorm_1.Column)({
        name: 'user_id',
        type: 'int',
        comment: '사용자 id',
        nullable: false,
    }),
    __metadata("design:type", Number)
], BlogComment.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '내용',
        example: '용기낸 모습이 아름답습니다.',
    }),
    (0, typeorm_1.Column)({
        name: 'content',
        type: 'text',
        comment: '내용',
        nullable: false,
    }),
    __metadata("design:type", String)
], BlogComment.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '리댓글 대상 댓글 pk',
        example: 'null || 리댓글 대상 댓글 pk(int)',
    }),
    (0, typeorm_1.Column)({
        name: 'comment_id',
        type: 'int',
        nullable: true,
        comment: 'null || 리댓글 대상 댓글 pk',
    }),
    __metadata("design:type", Object)
], BlogComment.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'reg_date',
        type: 'timestamp',
        nullable: false,
        comment: '생성 날짜',
    }),
    __metadata("design:type", Date)
], BlogComment.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'del_date',
        type: 'timestamp',
        precision: 0,
        comment: '삭제일',
        nullable: true,
    }),
    __metadata("design:type", Date)
], BlogComment.prototype, "delDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_deleted',
        type: 'tinyint',
        default: false,
        comment: '삭제 여부',
    }),
    __metadata("design:type", Boolean)
], BlogComment.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogComment.prototype, "beforeInsert", null);
BlogComment = __decorate([
    (0, typeorm_1.Entity)('blog_comment', { schema: 'knockknock' })
], BlogComment);
exports.BlogComment = BlogComment;
//# sourceMappingURL=BlogComment.js.map