import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'knockkonck',
  entities: ['./dist/**/*.entity{.ts,.js}', 'src/**/*.entity{.ts}'],
  // synchronize: true,
};
