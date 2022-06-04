import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { BlogChallenges } from 'src/entities/BlogChallenges';
import { BlogComment } from 'src/entities/BlogComment';
import { BlogImage } from 'src/entities/BlogImage';
import { BlogLike } from 'src/entities/BlogLike';
import { BlogPost } from 'src/entities/BlogPost';
import { BlogPromotion } from 'src/entities/BlogPromotion';
import { Challenges } from 'src/entities/Challenges';
import { Promotions } from 'src/entities/Promotions';
import { User } from 'src/entities/User';
dotenv.config({ path: __dirname + '/../../.env' });

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'knockknock',
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
  synchronize: false
};
