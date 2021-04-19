import { Module } from '@nestjs/common';
import { V1Module } from './api/v1/modules';

@Module({
  imports: [V1Module],
})
export class AppModule {}
