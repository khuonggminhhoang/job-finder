import { DatabaseType, DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const configuration = {
  type: 'mysql' as DatabaseType,
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? '3306'),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE ?? 'finance_management',
};

export const dataSourceOptions = {
  type: configuration.type,
  host: configuration.host,
  port: configuration.port,
  username: configuration.username,
  password: configuration.password,
  database: configuration.database,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/development/*{.ts,.js}'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
