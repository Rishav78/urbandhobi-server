import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { AuthModule } from './api/v1/modules';
import { V1Module } from './api/v1/v1.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const routes: Routes = [
  {
    path: 'v1',
    children: [AuthModule],
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
