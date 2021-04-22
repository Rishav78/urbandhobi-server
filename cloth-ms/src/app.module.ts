import { Module } from '@nestjs/common';
import { ClothModule, V1Module } from './api/v1/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [V1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
