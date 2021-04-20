import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [path.join(__dirname, 'entitys/**/*.entity{.ts,.js}')],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
