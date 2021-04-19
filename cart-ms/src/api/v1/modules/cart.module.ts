import { Module } from '@nestjs/common';
import { CartController } from '../controllers';
import { DatabaseModule } from '../db/db.module';
import { CartService } from '../services';

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
