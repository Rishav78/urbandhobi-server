import './lib/env';

import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './core/logger/logger.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'ud_services_queue',
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
    console.log('User microservice start listening');
  });
}
bootstrap();
