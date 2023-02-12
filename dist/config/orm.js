"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const Event_1 = require("../entities/Event");
const UserReportBlogPost_1 = require("../entities/UserReportBlogPost");
const UserToBlogPostHide_1 = require("../entities/UserToBlogPostHide");
require("dotenv/config");
const BlogChallenges_1 = require("../entities/BlogChallenges");
const BlogComment_1 = require("../entities/BlogComment");
const BlogImage_1 = require("../entities/BlogImage");
const BlogLike_1 = require("../entities/BlogLike");
const BlogPost_1 = require("../entities/BlogPost");
const BlogPromotion_1 = require("../entities/BlogPromotion");
const Challenges_1 = require("../entities/Challenges");
const Promotions_1 = require("../entities/Promotions");
const User_1 = require("../entities/User");
exports.ormConfig = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        './dist/**/*.entity{.ts,.js}',
        'src/**/*.entity{.ts}',
        BlogComment_1.BlogComment,
        BlogImage_1.BlogImage,
        BlogLike_1.BlogLike,
        BlogPost_1.BlogPost,
        BlogPromotion_1.BlogPromotion,
        BlogChallenges_1.BlogChallenges,
        Challenges_1.Challenges,
        Promotions_1.Promotions,
        User_1.User,
        UserToBlogPostHide_1.UserToBlogPostHide,
        UserReportBlogPost_1.UserReportBlogPost,
        Event_1.Event,
    ],
    synchronize: false,
    logging: false,
};
//# sourceMappingURL=orm.js.map