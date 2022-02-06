import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'knockknock',
  entities: ['./dist/**/*.entity{.ts,.js}', 'src/**/*.entity{.ts}'],
  // DDL 관리 전략이 없기 때문에 우선은 켜놨습니다!
  synchronize: process.env.SERVER_ENV === 'local' ? true : false,
};
