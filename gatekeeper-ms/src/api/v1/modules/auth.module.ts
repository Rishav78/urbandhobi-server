import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenManager } from 'src/lib/utils/token-manager';
import { AuthController } from '../controllers';
import { EmailSchema, name } from '../db/models';
import { AuthService } from '../services';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema: EmailSchema }])],
  controllers: [AuthController],
  providers: [AuthService, TokenManager],
})
export class AuthModule {}
