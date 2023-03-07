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
    beforeInsert() {
        this.regDate = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BlogPost.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 id',
        example: '1',
    }),
    (0, typeorm_1.Column)({
        name: 'user_id',
        type: 'int',
        nullable: false,
        comment: '사용자 아이디',
    }),
    __metadata("design:type", Number)
], BlogPost.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '내용',
        example: '패키지 상품을 받았을때의 기쁨 후엔 늘 골치아픈 쓰레기와 분리수거의 노동시간이 뒤따릅니다.',
    }),
    (0, typeorm_1.Column)({
        name: 'content',
        type: 'text',
        nullable: false,
        comment: '게시글 내용',
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 주소',
        example: '경기 성남시 분당구 대왕판교로 374',
        required: false,
        nullable: true,
    }),
    (0, typeorm_1.Column)({
        name: 'store_address',
        type: 'varchar',
        length: 200,
        nullable: true,
        comment: '매장 주소',
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "storeAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장명',
        example: '스타벅스 리버사이드팔당DTR점',
        required: false,
        nullable: true,
    }),
    (0, typeorm_1.Column)({
        name: 'store_name',
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: '매장 주소',
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 주소 x좌표(경도)',
        example: '127.102269186127',
        required: false,
        nullable: true,
    }),
    (0, typeorm_1.Column)({
        name: 'location_x',
        type: 'decimal',
        comment: 'x좌표(경도)',
        precision: 10,
        scale: 7,
        nullable: true,
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "locationX", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '매장 주소 y좌표(위도)',
        example: '37.3771012046504',
        required: false,
        nullable: true,
    }),
    (0, typeorm_1.Column)({
        name: 'location_y',
        type: 'decimal',
        comment: 'y좌표(위도)',
        precision: 10,
        scale: 7,
        nullable: true,
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "locationY", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '게시글 내 이미지의 비율',
        example: '1:1',
    }),
    (0, typeorm_1.Column)({
        name: 'scale',
        type: 'varchar',
        length: 30,
        nullable: false,
        comment: '게시글 내 이미지의 비율',
    }),
    __metadata("design:type", String)
], BlogPost.prototype, "scale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '조회수',
        example: '73',
    }),
    (0, typeorm_1.Column)({
        name: 'hits',
        type: 'int',
        comment: '조회수',
        default: 0,
        nullable: false,
    }),
    __metadata("design:type", Number)
], BlogPost.prototype, "hits", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'mod_date',
        type: 'timestamp',
        nullable: true,
        comment: '수정 날짜',
    }),
    __metadata("design:type", Date)
], BlogPost.prototype, "modDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '숨기기 수',
        example: '5',
    }),
    (0, typeorm_1.Column)({
        name: 'hide_count',
        type: 'int',
        comment: '숨기기 수',
        default: 0,
        nullable: false,
    }),
    __metadata("design:type", Number)
], BlogPost.prototype, "hideCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'reg_date',
        type: 'timestamp',
        nullable: false,
        comment: '등록 날짜',
    }),
    __metadata("design:type", Date)
], BlogPost.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'del_date',
        type: 'timestamp',
        precision: 0,
        comment: '삭제일',
        nullable: true,
    }),
    __metadata("design:type", Date)
], BlogPost.prototype, "delDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogPost.prototype, "beforeInsert", null);
BlogPost = __decorate([
    (0, typeorm_1.Entity)('blog_post', { schema: 'knockknock' })
], BlogPost);
exports.BlogPost = BlogPost;
//# sourceMappingURL=BlogPost.js.map