import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenManager } from 'src/lib/utils/token-manager';
import { AuthEmailController } from '../controllers';
import { EmailSchema, name } from '../db/models';
import { AuthEmailService } from '../services';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema: EmailSchema }])],
  controllers: [AuthEmailController],
  providers: [AuthEmailService, TokenManager],
})
export class AuthModule {}
