import { Controller, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AddItemDTO } from '../dto';
import { ItemService } from '../services';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @EventPattern('UD.Cart.Item.Create')
  public async createCart(
    @Payload(ValidationPipe)
    { itemId, count, serviceTypeId, serviceId, cartId, userId }: AddItemDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const id = await this.itemService.add({
        itemId,
        count,
        serviceId,
        serviceTypeId,
        cartId,
        userId,
      });
      return id;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
