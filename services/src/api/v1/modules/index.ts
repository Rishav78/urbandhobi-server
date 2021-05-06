export * from './services.module';

import { Module } from '@nestjs/common';
import { ServicesModule } from './services.module';

@Module({
  imports: [ServicesModule],
})
export class V1Module {}
