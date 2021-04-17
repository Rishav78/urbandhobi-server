import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { AuthModule, V1Module } from './api/v1/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const routes: Routes = [
  {
    path: 'api/auth',
    module: V1Module,
    childrens: [
      {
        path: 'v1',
        children: [AuthModule],
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
