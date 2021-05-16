import { Controller, Inject, ValidationPipe } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateUserDTO } from '../dto';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  @MessagePattern('UD.User.Create')
  public async create(
    @Payload(ValidationPipe) { email }: CreateUserDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const id = await this.userService.create({ email });
      const user = await this.userService.findById(id);
      this.cartClient.emit<string, { id: string }>('UD.Cart.Create', { id });
      return user;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @MessagePattern('UD.User.FindByEmail')
  public async findByEmail(
    @Payload(ValidationPipe) { email }: CreateUserDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const user = await this.userService.findByEmail(email);
      return user;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @MessagePattern('UD.User.CurrentUser')
  public async currentUser(
    @Payload(ValidationPipe) { email }: CreateUserDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const user = await this.userService.findByEmail(email);
      return user;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

}
