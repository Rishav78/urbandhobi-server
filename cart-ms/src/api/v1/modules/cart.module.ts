import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Iterator } from 'src/lib/utils/iterator.util';
import { CartController, ItemController } from '../controllers';
import { DatabaseModule } from '../db/db.module';
import { Cart, Item } from '../db/entitys';
import { CartService, ItemService } from '../services';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Cart, Item])],
  controllers: [CartController, ItemController],
  providers: [CartService, ItemService, Iterator],
})
export class CartModule {}
