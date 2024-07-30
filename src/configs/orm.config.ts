import { DataSource } from 'typeorm';
require('dotenv/config');

const dataSource = new DataSource({
  type: 'mysql',
  // host: process.env.DB_HOST || 'sql.freedb.tech',
  // username: process.env.DB_USER || 'freedb_sharearetanveer',
  // password: process.env.DB_PASSWORD || 'PJXH$Asn7E8r!cX',
  // database: process.env.DB_NAME || 'freedb_emspassportdb',
  // port: parseInt(process.env.DB_PORT || '3306', 10),
  host: 'sql12.freemysqlhosting.net',
  username: 'sql12722899',
  password:'D7jBRj7YxL',
  database: 'sql12722899',
  port: 3306,
  charset: 'utf8',
  synchronize: true,
  entities:
    process.env.NODE_ENV !== 'production'
      ? ['src/**/*.entity.ts']
      : ['dist/**/*.entity.js'],
/*   logging:
    process.env.NODE_ENV !== 'production'
      ? ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration']
      : ['error'], */
  subscribers: [],
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;
