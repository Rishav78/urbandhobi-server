import './lib/env';

import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'ud_gate_keeper_queue',
        noAck: false,
        persistent: true,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen(() => {
    console.log('GateKeeper microservice start listening');
  });
}
bootstrap();
