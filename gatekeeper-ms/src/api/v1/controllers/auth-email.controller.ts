import { Controller, Inject, UseFilters } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { ValidationPipe } from 'src/lib/pipe';
import { ExceptionFilter } from 'src/lib/filters';
import { SignInWithEmailDTO, SignUpWithEmailDTO } from '../dto/auth.dto';
import { AuthEmailService } from '../services';
import { HttpException } from 'src/lib/helpers';
import { TokenManager } from 'src/lib/utils/token-manager';
import { Authentication } from '../typings';

@Controller()
export class AuthEmailController {
  constructor(
    private readonly emailService: AuthEmailService,
    private readonly jwtService: TokenManager,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @UseFilters(new ExceptionFilter())
  @MessagePattern('UD.GateKeeper.SignInWithEmail')
  async signInWithEmail(
    @Payload(new ValidationPipe()) { email, password }: SignInWithEmailDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const tokens = this.emailService.signIn(email, password);
      return tokens;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('UD.GateKeeper.SignUpWithEmail')
  async signUpWithEmail(
    @Payload(new ValidationPipe()) { email, password }: SignUpWithEmailDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      if (await this.emailService.findByEmail(email)) {
        throw new RpcException(
          new HttpException('user with this email already exist', 409),
        );
      }
      // generate token
      const tokens = await this.emailService.create(email, password);

      // notify user creation to user microservice
      this.userClient.emit('UD.User.Create', { email });

      return tokens;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('UD.GateKeeper.IsAuthenticated')
  public async authenticated(
    @Payload() token: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      if (await this.jwtService.verifyAccess(token)) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('UD.GateKeeper.CurrentUser')
  public async currentUser(
    @Payload() token: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const payload = await this.jwtService.verifyAccess(token);
      if (!payload) {
        return null;
      }

      switch (payload.method) {
        case 'email': {
          const { email } = await this.emailService.findById(payload.id);
          const user = await this.userClient
            .send('UD.User.FindByEmail', { email })
            .toPromise();
          return user;
        }
        default:
          throw new HttpException('invalid login method', 500);
      }
      return null;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
