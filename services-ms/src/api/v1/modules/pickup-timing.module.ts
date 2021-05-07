import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimingController } from '../controllers';
import { PickupTiming } from '../db/entitys';
import { TimingService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([PickupTiming])],
  controllers: [TimingController],
  providers: [TimingService],
})
export class TimingModule {}
