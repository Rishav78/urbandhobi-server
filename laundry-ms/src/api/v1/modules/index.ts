import { Module } from '@nestjs/common';
import { PostgressModule } from '../db/providers/postgres';
import { RequestModule } from './request.module';

@Module({
  imports: [PostgressModule, RequestModule],
})
export class V1Module {}
