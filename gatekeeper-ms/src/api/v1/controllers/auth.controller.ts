import { Controller, UseFilters } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { ValidationPipe } from 'src/lib/pipe';
import { ExceptionFilter } from 'src/lib/filters';
import { SignUpWithEmailDTO } from '../dto/auth.dto';
import { AuthService } from '../services';
import { HttpException } from 'src/lib/helpers';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @UseFilters(new ExceptionFilter())
  @MessagePattern('UD.GateKeeper.SignUpWithEmail')
  async signUpWithEmail(
    @Payload(new ValidationPipe()) { email, password }: SignUpWithEmailDTO,
    @Ctx() context: RmqContext,
  ): Promise<boolean> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      if (await this.appService.findByEmail(email)) {
        throw new RpcException(
          new HttpException('user with this email already exist', 409),
        );
      }

      await this.appService.signUpWithEmail(email, password);

      return true;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
