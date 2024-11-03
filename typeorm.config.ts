import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

/**
 * This configures the DB interface for the
 * migration tool which runs independently
 * and is not part of the API
 */

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*.ts'],
});
