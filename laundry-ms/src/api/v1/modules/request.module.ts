import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestController } from '../controllers';
import { Request } from '../db/entitys';
import { RequestService } from '../services';

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
    TypeOrmModule.forFeature([Request]),
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
