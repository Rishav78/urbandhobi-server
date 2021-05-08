import {
  Controller,
  Logger,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateCartDTO, SubmitIfNotDTO } from '../dto';
import { CartService } from '../services/cart.service';

@Controller()
export class CartController {
  private readonly logger = new Logger('CART CONTROLLER', true);
  constructor(private readonly cartService: CartService) {}

  @EventPattern('UD.Cart.Create')
  public async create(
    @Payload(ValidationPipe) { id: userId, name }: CreateCartDTO,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log('hi');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const id = await this.cartService.create({ userId, name });
      return id;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @EventPattern('UD.Cart.FindByUserId')
  public async findByUserId(
    @Payload(ValidationPipe) userId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const cart = await this.cartService.findByUserId(userId);
      return cart;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @EventPattern('UD.Cart.Submit')
  public async submit(
    @Payload(ValidationPipe) userId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const id = await this.cartService.submit(userId);
      const cart = await this.cartService.findById(id, userId);
      return cart;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @EventPattern('UD.Cart.SubmitIfNot')
  public async submitIfNot(
    @Payload(ValidationPipe) { id, userId }: SubmitIfNotDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      return await this.cartService.submitIfNot(id, userId);
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
