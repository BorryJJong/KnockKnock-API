"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerBuilder = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../shared/dto/response.dto");
const challenges_dto_1 = require("../api/challenges/dto/challenges.dto");
const feed_dto_1 = require("../api/feed/dto/feed.dto");
const home_dto_1 = require("../api/home/dto/home.dto");
const promotions_dto_1 = require("../api/promotions/dto/promotions.dto");
const users_dto_1 = require("../api/users/dto/users.dto");
const auth_dto_1 = require("../auth/dto/auth.dto");
function swaggerBuilder(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('녹녹')
        .setDescription('API DOCS')
        .setVersion('beta')
        .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
    })
        .build();
    const swaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: [
            home_dto_1.GetListHotFeedResDTO,
            promotions_dto_1.GetPromotionResDTO,
            feed_dto_1.GetListFeedLikeResDTO,
            challenges_dto_1.GetChallengeTitleReqDTO,
            challenges_dto_1.GetChallengeResDTO,
            auth_dto_1.SocialLoginResponseDTO,
            users_dto_1.GetUserResDTO,
            feed_dto_1.GetListFeedCommentResDTO,
            feed_dto_1.GetFeedViewResDTO,
            feed_dto_1.GetListFeedResDTO,
            feed_dto_1.GetListFeedMainResDTO,
            response_dto_1.ApiResponseDTO,
            challenges_dto_1.GetListChallengeInfoResDTO,
            challenges_dto_1.ParticipantUserDTO,
            feed_dto_1.CreateFeedResDTO,
            challenges_dto_1.GetChallengeListResDTO,
            home_dto_1.GetHomeListEventResDTO,
            home_dto_1.GetListEventResDTO,
            home_dto_1.GetListBannerResDTO,
            home_dto_1.GetHomeListVerifiredShopResDTO,
            home_dto_1.GetListVerifiredShopResDTO,
        ],
    });
    swagger_1.SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
}
exports.swaggerBuilder = swaggerBuilder;
//# sourceMappingURL=swagger.js.map