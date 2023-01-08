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
exports.APIBaseResponse = exports.ErrorMessage = exports.UpdateFeedResponse = exports.DeleteBlogCommentResponse = exports.GetListFeedLikeResponse = exports.GetFeedCommentResponse = exports.GetFeedViewResponse = exports.FeedCreateResponse = exports.FeedResponseData = void 0;
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../../enums/enum");
const feed_dto_1 = require("../../../api/feed/dto/feed.dto");
const base_response_1 = require("../base.response");
class FeedResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], FeedResponseData.prototype, "status", void 0);
exports.FeedResponseData = FeedResponseData;
class FeedCreateResponse extends base_response_1.BaseResponse {
    constructor() {
        super();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", FeedResponseData)
], FeedCreateResponse.prototype, "data", void 0);
exports.FeedCreateResponse = FeedCreateResponse;
class GetFeedViewResponse extends base_response_1.BaseResponse {
    constructor() {
        super();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", feed_dto_1.GetFeedViewResDTO)
], GetFeedViewResponse.prototype, "data", void 0);
exports.GetFeedViewResponse = GetFeedViewResponse;
class GetFeedCommentResponse extends base_response_1.BaseResponse {
    constructor() {
        super();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [feed_dto_1.GetListFeedCommentResDTO] }),
    __metadata("design:type", Array)
], GetFeedCommentResponse.prototype, "data", void 0);
exports.GetFeedCommentResponse = GetFeedCommentResponse;
class GetListFeedLikeResponse extends base_response_1.BaseResponse {
    constructor() {
        super();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: feed_dto_1.GetListFeedLikeResDTO }),
    __metadata("design:type", feed_dto_1.GetListFeedLikeResDTO)
], GetListFeedLikeResponse.prototype, "data", void 0);
exports.GetListFeedLikeResponse = GetListFeedLikeResponse;
class DeleteBlogCommentResponse extends base_response_1.BaseResponse {
    constructor() {
        super();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", FeedResponseData)
], DeleteBlogCommentResponse.prototype, "data", void 0);
exports.DeleteBlogCommentResponse = DeleteBlogCommentResponse;
class UpdateFeedResponse extends base_response_1.BaseResponse {
    constructor() {
        super();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", FeedResponseData)
], UpdateFeedResponse.prototype, "data", void 0);
exports.UpdateFeedResponse = UpdateFeedResponse;
class ErrorMessage {
    constructor(data) {
        this.data = data;
    }
}
exports.ErrorMessage = ErrorMessage;
class APIBaseResponse {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ground Rule Http status',
        example: '성공시 200',
    }),
    __metadata("design:type", Number)
], APIBaseResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답에 대한 결과 메세지',
        example: 'SUCCESS or FAIL',
        enum: enum_1.API_RESPONSE_MEESAGE,
    }),
    __metadata("design:type", String)
], APIBaseResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답값에 필요한 데이터',
        nullable: true,
    }),
    __metadata("design:type", Object)
], APIBaseResponse.prototype, "data", void 0);
exports.APIBaseResponse = APIBaseResponse;
//# sourceMappingURL=temp.response.js.map