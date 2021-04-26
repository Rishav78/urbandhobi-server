import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Iterator } from 'src/lib/utils/iterator.util';
import { ClothController } from '../controllers';
import { Cloth } from '../db/entitys';
import { PostgressModule } from '../db/providers/postgres';
import { ClothService } from '../services';

@Module({
  imports: [PostgressModule, TypeOrmModule.forFeature([Cloth])],
  controllers: [ClothController],
  providers: [ClothService, Iterator],
})
export class ClothModule {}
