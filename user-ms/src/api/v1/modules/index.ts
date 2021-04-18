export * from './user.module';

import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { DatabaseModule } from '../db/db.module';

@Module({
  imports: [DatabaseModule, UserModule],
})
export class V1Module {}
