import { Controller, UseFilters } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { ValidationPipe } from 'src/lib/pipe';
import { ExceptionFilter } from 'src/lib/filters';
import { SignInWithEmailDTO, SignUpWithEmailDTO } from '../dto/auth.dto';
import { AuthService } from '../services';
import { HttpException } from 'src/lib/helpers';
import { TokenManager } from 'src/lib/utils/token-manager';

@Controller()
export class AuthController {
  constructor(
    private readonly appService: AuthService,
    private readonly jwtService: TokenManager,
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
      const user = await this.appService.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new RpcException(
          new HttpException('email or password is incorrect', 404),
        );
      }

      const tokens = await this.jwtService.signAccessAndRefresh(
        {
          admin: false,
          id: user._id,
          method: 'email',
        },
        {
          admin: false,
          id: user._id,
          method: 'email',
          email: user.email,
        },
      );

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
        case 'email':
          return this.appService.findById(payload.id);
      }
      return null;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
