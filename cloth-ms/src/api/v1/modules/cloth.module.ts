import { Module } from '@nestjs/common';
import { PostgressModule } from '../db/providers/postgres';

@Module({
  imports: [PostgressModule],
})
export class ClothModule {}
