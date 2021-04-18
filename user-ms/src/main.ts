import './lib/env';
//192.168.65.0/24
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
        queue: 'ud_user_queue',
        noAck: false,
        persistent: true,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen(() => {
    console.log('User microservice start listening');
  });
}
bootstrap();
