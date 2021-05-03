import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule, Routes } from 'nest-router';
import { V1Module, AddressModule } from './api/v1/modules';

const routes: Routes = [
  {
    path: 'api/address',
    module: V1Module,
    childrens: [
      {
        path: 'v1',
        children: [AddressModule],
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
