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
exports.GetListFeedLikeResponse = exports.GetFeedCommentResponse = exports.GetFeedViewResponse = exports.FeedCreateResponse = exports.FeedCreateResponseData = void 0;
const swagger_1 = require("@nestjs/swagger");
const feed_dto_1 = require("../../../api/feed/dto/feed.dto");
const base_response_1 = require("../base.response");
class FeedCreateResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], FeedCreateResponseData.prototype, "status", void 0);
exports.FeedCreateResponseData = FeedCreateResponseData;
class FeedCreateResponse extends base_response_1.BaseResponse {
    constructor() {
        super();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", FeedCreateResponseData)
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
//# sourceMappingURL=temp.response.js.map