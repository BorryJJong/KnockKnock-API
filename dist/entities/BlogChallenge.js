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
exports.BlogChallenge = void 0;
const typeorm_1 = require("typeorm");
let BlogChallenge = class BlogChallenge {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "int", name: "post_id", comment: "피드 아이디" }),
    __metadata("design:type", Number)
], BlogChallenge.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "int", name: "challenge_id", comment: "챌린지 아이디" }),
    __metadata("design:type", Number)
], BlogChallenge.prototype, "challengeId", void 0);
BlogChallenge = __decorate([
    (0, typeorm_1.Entity)("blog_challenge", { schema: "knockknock" })
], BlogChallenge);
exports.BlogChallenge = BlogChallenge;
//# sourceMappingURL=BlogChallenge.js.map