import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from '../controllers';
import { DatabaseModule } from '../db/db.module';
import { Address } from '../db/entitys';
import { AddressService } from '../services';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AppModule {}
