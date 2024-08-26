import { DataSource } from 'typeorm';
require('dotenv/config');

const dataSource = new DataSource({
  // type: 'mysql',
  // host: process.env.DB_HOST,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: parseInt(process.env.DB_PORT || '3306', 10),
  // charset: 'utf8',
  type: 'postgres',
  host: 'dpg-cqkb6kiju9rs738k2340-a',
  username: 'codecanvas',
  password:'5uyz0qv41s7EZBuB2HFdkSC3zL7z8CWk',
  database: 'codecanvasdb',
  port: 5432,
  synchronize: true,
  entities:
    process.env.NODE_ENV !== 'production'
      ? ['src/**/*.entity.ts']
      : ['dist/**/*.entity.js'],
  // logging:
  //   process.env.NODE_ENV !== 'production'
  //     ? ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration']
  //     : ['error'],
  subscribers: [],
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;
