import { DataSource } from 'typeorm';
require('dotenv/config');

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  charset: 'utf8',
  // synchronize: true,
  entities:
    process.env.NODE_ENV !== 'production'
      ? ['src/**/*.entity.ts']
      : ['dist/**/*.entity.js'],
  logging:
    process.env.NODE_ENV !== 'production'
      ? ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration']
      : ['error'],
  subscribers: [],
  migrations:
    process.env.NODE_ENV !== 'production'
      ? ['src/migrations/*.ts']
      : ['dist/migrations/*.js'],
});

export default dataSource;
