import 'src/api/image/node_modules/dotenv/config';
import {BlogChallenges} from 'src/entities/BlogChallenges';
import {BlogComment} from 'src/entities/BlogComment';
import {BlogImage} from 'src/entities/BlogImage';
import {BlogLike} from 'src/entities/BlogLike';
import {BlogPost} from 'src/entities/BlogPost';
import {BlogPromotion} from 'src/entities/BlogPromotion';
import {Challenges} from 'src/entities/Challenges';
import {Promotions} from 'src/entities/Promotions';
import {User} from 'src/entities/User';
import {ConnectionOptions} from 'typeorm';

export const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    './dist/**/*.entity{.ts,.js}',
    'src/**/*.entity{.ts}',
    BlogComment,
    BlogImage,
    BlogLike,
    BlogPost,
    BlogPromotion,
    BlogChallenges,
    Challenges,
    Promotions,
    User,
  ],
  synchronize: false,
};
