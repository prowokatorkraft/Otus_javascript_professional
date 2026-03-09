import { Module } from '@nestjs/common';
import { NotesModule } from "./notes/notes.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Note } from "../shared/entities/note.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT', 5432),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [ Note ],
        logging: true,
        namingStrategy: undefined
      }),
      inject: [ConfigService],
    }),
    NotesModule
  ]
})
export class AppModule {}
