import 'dotenv/config'
import {ConnectionOptions} from 'typeorm';

const connectionOptions: ConnectionOptions[] = [
  {
    name: 'default',
    type: 'mysql',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/src/entities/*{.ts,.js}'],
    migrations: [__dirname + '/src/entities/migrations/**/*.ts'],
    migrationsTableName: 'migrations',
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/entities/migrations',
    },
    synchronize: false,
    logging: true,
  },
];

export = connectionOptions;
