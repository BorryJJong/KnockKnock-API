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
exports.BlogPost = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let BlogPost = class BlogPost {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id', comment: '아이디' }),
    __metadata("design:type", Number)
], BlogPost.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 id',
        example: '1',
    }),
    (0, typeorm_1.Column)('int', { name: 'user_id', comment: '사용자 아이디' }),
    __metadata("design:type", Number)
], BlogPost.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '내용',
        example: '패키지 상품을 받았을때의 기쁨 후엔 늘 골치아픈 쓰레기와 분리수거의 노동시간이 뒤따릅니다.',
    }),
    (0, typeorm_1.Column)('text', { name: 'content', comment: '내용' }),
    __metadata("design:type", String)
], BlogPost.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 주소',
        example: '경기 성남시 분당구 대왕판교로 374',
    }),
    (0, typeorm_1.Column)('varchar', {
        name: 'store_address',
        comment: '매장 주소',
        length: 200,
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "storeAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 주소 x좌표',
        example: '127.102269186127',
    }),
    (0, typeorm_1.Column)('decimal', {
        name: 'location_x',
        comment: 'x좌표',
        precision: 10,
        scale: 7,
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "locationX", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 주소 y좌표',
        example: '37.3771012046504',
    }),
    (0, typeorm_1.Column)('decimal', {
        name: 'location_y',
        comment: 'y좌표',
        precision: 10,
        scale: 7,
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "locationY", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '조회수',
        example: '73',
    }),
    (0, typeorm_1.Column)('int', { name: 'hits', comment: '조회수', default: 0 }),
    __metadata("design:type", Number)
], BlogPost.prototype, "hits", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', {
        name: 'mod_date',
        nullable: true,
        comment: '수정 날짜',
    }),
    __metadata("design:type", Date)
], BlogPost.prototype, "modDate", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'reg_date',
        comment: '등록 날짜',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], BlogPost.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'del_date',
        nullable: true,
        comment: '삭제 날짜',
    }),
    __metadata("design:type", Date)
], BlogPost.prototype, "delDate", void 0);
__decorate([
    (0, typeorm_1.Column)('char', {
        name: 'Is_deleted',
        nullable: true,
        comment: '삭제 여부',
        length: 1,
        default: () => "'N'",
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "isDeleted", void 0);
BlogPost = __decorate([
    (0, typeorm_1.Entity)('blog_post', { schema: 'knockknock' })
], BlogPost);
exports.BlogPost = BlogPost;
//# sourceMappingURL=BlogPost.js.map