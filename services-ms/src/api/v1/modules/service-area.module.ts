import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceAreaController } from '../controllers';
import { ServiceState, ServiceCountry } from '../db/entitys';
import { ServiceAreaService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceState, ServiceCountry])],
  controllers: [ServiceAreaController],
  providers: [ServiceAreaService],
})
export class ServiceAreaModule {}
