import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from '../controllers';
import { Address } from '../db/entities';
import { PostgressModule } from '../db/providers';
import { AddressService } from '../services';

@Module({
  imports: [PostgressModule, TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
