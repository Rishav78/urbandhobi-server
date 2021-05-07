export * from './request.module';

import { Module } from '@nestjs/common';
import { RequestModule } from './request.module';

@Module({
  imports: [RequestModule],
})
export class V1Module {}
