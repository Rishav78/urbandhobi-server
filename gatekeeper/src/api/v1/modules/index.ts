export * from './auth.module';

import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
})
export class V1Module {}
