export * from './cloth.module';

import { Module } from '@nestjs/common';
import { ClothModule } from './cloth.module';

Module({
  imports: [ClothModule],
});
export class V1Module {}
