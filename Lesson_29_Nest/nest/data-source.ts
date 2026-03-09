import { DataSource } from 'typeorm';
//import { Note } from './shared/entities/note.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'nest',
  schema: 'notes',
  entities: ['./shared/entities/**/*.entity{.ts,.js}'],
  migrations: ['./migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});