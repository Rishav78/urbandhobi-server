export * from './user.module';

import { Module } from '@nestjs/common';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
})
export class V1Module {}
