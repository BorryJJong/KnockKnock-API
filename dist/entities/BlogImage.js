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
exports.BlogImage = void 0;
const typeorm_1 = require("typeorm");
let BlogImage = class BlogImage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BlogImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'post_id',
        type: 'int',
        nullable: false,
        comment: '게시글 아이디',
    }),
    __metadata("design:type", Number)
], BlogImage.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'file_url',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '게시물 업로드 파일 경로',
    }),
    __metadata("design:type", String)
], BlogImage.prototype, "fileUrl", void 0);
BlogImage = __decorate([
    (0, typeorm_1.Entity)('blog_image', { schema: 'knockknock' })
], BlogImage);
exports.BlogImage = BlogImage;
//# sourceMappingURL=BlogImage.js.map