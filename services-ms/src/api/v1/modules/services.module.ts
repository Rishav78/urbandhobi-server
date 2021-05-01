import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from '../controllers';
import { Services } from '../db/entitys';
import { ServicesService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
