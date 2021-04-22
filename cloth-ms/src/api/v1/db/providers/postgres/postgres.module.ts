import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from '../../../../../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig)],
})
export class PostgressModule {}
