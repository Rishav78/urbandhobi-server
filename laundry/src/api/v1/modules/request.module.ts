import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RequestController } from '../controllers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LAUNDRY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'ud_laundry_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'CART_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'ud_cart_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'AUTHENTICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'ud_gate_keeper_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'ud_user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [RequestController],
  providers: [],
})
export class RequestModule {}
