import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthMiddleware } from 'src/lib/middlewares';
import { ItemController } from '../controllers';

@Module({
  imports: [
    ClientsModule.register([
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
    ]),
    ClientsModule.register([
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
    ]),
  ],
  controllers: [ItemController],
})
export class ItemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes({
      path: '/api/cart/v1/item',
      method: RequestMethod.PUT,
    });

    consumer.apply(JwtAuthMiddleware).forRoutes({
      path: '/api/cart/v1/item/s',
      method: RequestMethod.PUT,
    });

    consumer.apply(JwtAuthMiddleware).forRoutes({
      path: '/api/cart/v1/item/all',
      method: RequestMethod.GET,
    });
  }
}
