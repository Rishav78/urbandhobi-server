export * from './cart.module';
export * from './item.module';

import { Module } from '@nestjs/common';
import { CartModule } from './cart.module';
import { ItemModule } from './item.module';

@Module({
  imports: [CartModule, ItemModule],
})
export class V1Module {}
