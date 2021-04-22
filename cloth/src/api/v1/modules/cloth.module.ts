import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClothController } from '../controllers/cloth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLOTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'ud_cloth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ClothController],
})
export class ClothModule {}
