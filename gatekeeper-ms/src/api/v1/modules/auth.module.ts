import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenManager } from 'src/lib/utils/token-manager';
import { AuthEmailController } from '../controllers';
import { EmailSchema, name } from '../db/models';
import { AuthEmailService } from '../services';

@Module({
  imports: [
    ClientsModule.register([
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
    MongooseModule.forFeature([{ name, schema: EmailSchema }]),
  ],
  controllers: [AuthEmailController],
  providers: [AuthEmailService, TokenManager],
})
export class AuthModule {}
