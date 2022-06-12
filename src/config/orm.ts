import 'dotenv/config';
import {ConnectionOptions} from 'typeorm';
import {User} from '../api/users/users.entity';
import {BlogChallenges} from '../entities/BlogChallenges';
import {BlogComment} from '../entities/BlogComment';
import {BlogImage} from '../entities/BlogImage';
import {BlogLike} from '../entities/BlogLike';
import {BlogPost} from '../entities/BlogPost';
import {BlogPromotion} from '../entities/BlogPromotion';
import {Challenges} from '../entities/Challenges';
import {Promotions} from '../entities/Promotions';

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
