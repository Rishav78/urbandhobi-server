import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';
import { UserModule, V1Module } from './api/v1/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const routes: Routes = [
  {
    path: 'api/user',
    module: V1Module,
    childrens: [
      {
        path: 'v1',
        children: [UserModule],
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
