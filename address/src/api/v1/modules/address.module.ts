import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthMiddleware } from 'src/lib/middlewares';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADDRESS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'ud_address_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class AddressModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware);
  }
}
