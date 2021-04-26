import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';
import { V1Module, ClothModule } from './api/v1/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const routes: Routes = [
  {
    path: 'api/cloth/v1',
    module: V1Module,
    children: [
      {
        path: '/',
        children: [ClothModule],
      },
    ],
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes), V1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
