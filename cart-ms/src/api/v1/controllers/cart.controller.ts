import { Controller, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateCartDTO } from '../dto';
import { CartService } from '../services/cart.service';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @EventPattern('UD.Cart.Create')
  public async create(
    @Payload(ValidationPipe) { id: userId, name }: CreateCartDTO,
    @Ctx() context: RmqContext,
  ) {
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
      const cart = this.cartService.findByUserId(userId);
      return cart;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
