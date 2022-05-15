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
exports.BlogLike = void 0;
const typeorm_1 = require("typeorm");
let BlogLike = class BlogLike {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id', comment: 'pk필수?' }),
    __metadata("design:type", Number)
], BlogLike.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'post_id', comment: '게시글 아이디' }),
    __metadata("design:type", Number)
], BlogLike.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'user_id', comment: '사용자 아이디' }),
    __metadata("design:type", Number)
], BlogLike.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'reg_date', comment: '등록 날짜' }),
    __metadata("design:type", Date)
], BlogLike.prototype, "regDate", void 0);
BlogLike = __decorate([
    (0, typeorm_1.Entity)('blog_like', { schema: 'knockknock' })
], BlogLike);
exports.BlogLike = BlogLike;
//# sourceMappingURL=BlogLike.js.map