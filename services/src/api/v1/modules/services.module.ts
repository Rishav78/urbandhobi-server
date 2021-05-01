import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServicesController, ServiceTypeController } from '../controllers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'ud_services_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ServicesController, ServiceTypeController],
})
export class ServicesModule {}
