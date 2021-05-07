import { Module } from '@nestjs/common';
import { PostgressModule } from '../db/providers/postgres';
import { ServicesModule } from './services.module';
import { ServiceTypeModule } from './service-type.module';
import { ServiceAreaModule } from './service-area.module';
import { TimingModule } from './pickup-timing.module';

@Module({
  imports: [
    PostgressModule,
    ServiceTypeModule,
    ServicesModule,
    ServiceAreaModule,
    TimingModule,
  ],
})
export class V1Module {}
