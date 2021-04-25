import { Controller, ValidationPipe, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Iterator } from 'src/lib/utils/iterator.util';
import { AddItemsEvent, AddItemEvent, DeleteItemEvent } from '../dto';
import { Item as ItemT } from '../typings';
import { CartService, ItemService } from '../services';

@Controller()
export class ItemController {
  private readonly logger: Logger = new Logger('ITEM CONTROLLER');
  constructor(
    private readonly itemService: ItemService,
    private readonly cartService: CartService,
    private readonly iterator: Iterator,
  ) {}

  @EventPattern('UD.Cart.Item.Add')
  public async addItem(
    @Payload(ValidationPipe)
    { data, userId }: AddItemEvent,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      return await this.itemService.add({ ...data, userId });
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @EventPattern('UD.Cart.Items.Add')
  public async addItems(
    @Payload(ValidationPipe)
    { data, userId }: AddItemsEvent,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      console.log(data);
      const obj: { [key: string]: ItemT.AddService } = {};
      await this.iterator.forEach(data, async (item) => {
        const { cartId, serviceId, itemId, serviceTypeId, count } = item;
        // check for duplicate item entry in array
        if (obj[itemId]) obj[itemId].count += count || 1;
        else
          obj[itemId] = {
            cartId,
            serviceId,
            itemId,
            serviceTypeId,
            userId,
            count: count || 1,
          };
      });
      const items = Object.values(obj);
      return await this.itemService.add(items);
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @EventPattern('UD.Cart.Items.Get')
  public async getItems(
    @Payload(ValidationPipe) userId: string,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log('getItems start');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const items = await this.itemService.findByUserId(userId);
      return items;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      channel.ack(originalMsg);
      this.logger.log('getItems end');
    }
  }

  @EventPattern('UD.Cart.Item.Delete')
  public async deleteItem(
    @Payload(ValidationPipe) { data, userId }: DeleteItemEvent,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log('deleteItem start');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const cart = await this.cartService.findByUserId(userId);
      await this.itemService.delete(data.id, cart.id);
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      channel.ack(originalMsg);
      this.logger.log('deleteItem end');
    }
  }
}
