import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import {ApiResponseDTO} from '@shared/dto/response.dto';
import {
  GetChallengeListResDTO,
  GetChallengeResDTO,
  GetChallengeTitleReqDTO,
  GetListChallengeInfoResDTO,
  ParticipantUserDTO,
} from 'src/api/challenges/dto/challenges.dto';
import {
  CreateFeedResDTO,
  GetFeedViewResDTO,
  GetListFeedCommentResDTO,
  GetListFeedLikeResDTO,
  GetListFeedMainResDTO,
  GetListFeedResDTO,
} from 'src/api/feed/dto/feed.dto';
import {
  GetHomeListEventResDTO,
  GetHomeListVerifiredShopResDTO,
  GetListBannerResDTO,
  GetListEventResDTO,
  GetListHotFeedResDTO,
  GetListVerifiredShopResDTO,
} from 'src/api/home/dto/home.dto';
import {GetPromotionResDTO} from 'src/api/promotions/dto/promotions.dto';
import {GetUserResDTO} from 'src/api/users/dto/users.dto';
import {SocialLoginResponseDTO} from 'src/auth/dto/auth.dto';

export function swaggerBuilder(app) {
  const config = new DocumentBuilder()
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

  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config, {
    extraModels: [
      GetListHotFeedResDTO,
      GetPromotionResDTO,
      GetListFeedLikeResDTO,
      GetChallengeTitleReqDTO,
      GetChallengeResDTO,
      SocialLoginResponseDTO,
      GetUserResDTO,
      GetListFeedCommentResDTO,
      GetFeedViewResDTO,
      GetListFeedResDTO,
      GetListFeedMainResDTO,
      ApiResponseDTO,
      GetListChallengeInfoResDTO,
      ParticipantUserDTO,
      CreateFeedResDTO,
      GetChallengeListResDTO,
      GetHomeListEventResDTO,
      GetListEventResDTO,
      GetListBannerResDTO,
      GetHomeListVerifiredShopResDTO,
      GetListVerifiredShopResDTO,
    ],
  });
  SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
}
