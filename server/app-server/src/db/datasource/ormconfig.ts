import 'dotenv/config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  username:
    process.env.TYPEORM_USERNAME || process.env.PG_ADMIN_USER || 'postgres',
  password:
    process.env.TYPEORM_PASSWORD || process.env.PG_ADMIN_PASSWORD || 'postgres',
  database: process.env.TYPEORM_DATABASE || process.env.PG_DATABASE || 'pg3',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
});
