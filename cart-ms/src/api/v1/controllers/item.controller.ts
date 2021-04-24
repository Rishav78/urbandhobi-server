import { Controller, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Iterator } from 'src/lib/utils/iterator.util';
import { AddItemDTO } from '../dto';
import { ItemService } from '../services';

@Controller()
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly iterator: Iterator,
  ) {}

  @EventPattern('UD.Cart.Item.Add')
  public async add(
    @Payload(ValidationPipe) data: AddItemDTO | AddItemDTO[],
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      let items: AddItemDTO | AddItemDTO[];
      if (Array.isArray(data)) {
        const obj: { [key: string]: AddItemDTO } = {};
        await this.iterator.forEach(data, async (item) => {
          const {
            cartId,
            serviceId,
            itemId,
            serviceTypeId,
            userId,
            count,
          } = item;
          if (obj[itemId]) obj[itemId].count += count;
          else
            obj[itemId] = {
              cartId,
              serviceId,
              itemId,
              serviceTypeId,
              userId,
              count,
            };
        });
        items = Object.values(obj);
      } else {
        const {
          cartId,
          serviceId,
          itemId,
          serviceTypeId,
          userId,
          count,
        } = data;
        items = { cartId, serviceId, itemId, serviceTypeId, userId, count };
      }
      return await this.itemService.add(items);
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
