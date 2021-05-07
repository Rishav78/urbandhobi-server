import './lib/env';

import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { loggerConfig } from './core/logger/logger.config';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'ud_cart_queue',
        noAck: false,
        persistent: true,
        queueOptions: {
          durable: false,
        },
      },
      logger: WinstonModule.createLogger(loggerConfig),
    },
  );
  await app.listen(() => {
    console.log('Cart microservice start listening');
  });
}
bootstrap();
