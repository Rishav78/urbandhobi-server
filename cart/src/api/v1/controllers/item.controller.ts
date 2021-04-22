import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'src/typings';
import { AddItem, Item } from '../typings';
import { UserContext } from '../decorators/user.decorator';
import { AddItemDTO } from '../dto';

@Controller('item')
export class ItemController {
  constructor(
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  @Put()
  public async add(
    @Body(ValidationPipe)
    { cartId, itemId, serviceId, serviceTypeId, count }: AddItemDTO,
    @UserContext() { id: userId }: User,
  ) {
    try {
      const item = await this.cartClient
        .send<any, AddItem>('UD.Cart.Item.Add', {
          count,
          serviceTypeId,
          serviceId,
          itemId,
          cartId,
          userId,
        })
        .toPromise<Item>();
      return item;
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  public async delete() {}

  @Patch()
  public async update() {}

  @Get()
  public async get() {}
}
