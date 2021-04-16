import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), AuthModule],
})
export class V1Module {}
