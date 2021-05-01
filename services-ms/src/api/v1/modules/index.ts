import { Module } from '@nestjs/common';
import { PostgressModule } from '../db/providers/postgres';
import { ServicesModule } from './services.module';
import { ServiceTypeModule } from './service-type.module';

@Module({
  imports: [PostgressModule, ServiceTypeModule, ServicesModule],
})
export class V1Module {}
