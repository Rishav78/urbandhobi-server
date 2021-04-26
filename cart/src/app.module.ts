import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { V1Module, CartModule, ItemModule } from './api/v1/modules';

const routes: Routes = [
  {
    path: 'api/cart',
    module: V1Module,
    childrens: [
      {
        path: 'v1',
        children: [CartModule, ItemModule],
      },
    ],
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes), V1Module],
})
export class AppModule {}
