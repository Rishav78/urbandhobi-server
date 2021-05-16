import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from '../controllers';
import { AdminAuthController } from '../controllers/admin-auth.controller';

@Module({
  imports: [
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
  controllers: [AuthController, AdminAuthController],
  providers: [],
})
export class AuthModule {}
