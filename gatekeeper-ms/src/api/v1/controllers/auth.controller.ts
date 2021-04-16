import { ConflictException, Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ValidationPipe } from 'src/lib/pipe/validation.pipe';
import { SignUpWithEmailDTO } from '../dto/auth.dto';
import { AuthService } from '../services';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @MessagePattern('UD.GateKeeper.SignInWithEmail')
  async signUpWithEmail(
    @Payload(new ValidationPipe()) { email, password }: SignUpWithEmailDTO,
    @Ctx() context: RmqContext,
  ): Promise<boolean> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (await this.appService.findByEmail(email)) {
      throw new ConflictException('user with this email already exist');
    }

    await this.appService.signUpWithEmail(email, password);

    channel.ack(originalMsg);

    return true;
  }
}
