import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseArrayPipe,
  Patch,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'src/typings';
import { AddItem, Item, EventPayload } from '../typings';
import { UserContext } from '../decorators/user.decorator';
import { AddItemDTO } from '../dto';

@Controller('item')
export class ItemController {
  constructor(
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  @Put()
  public async addItems(
    @Body(new ParseArrayPipe({ items: AddItemDTO })) data: AddItemDTO[],
    @UserContext() { id: userId }: User,
  ) {
    try {
      const item = await this.cartClient
        .send<any, EventPayload<AddItemDTO[]>>('UD.Cart.Items.Add', {
          data,
          userId,
        })
        .toPromise<Item>();
      return item;
    } catch (error) {
      throw error;
    }
  }

  @Put('s')
  public async addItem(
    @Body(ValidationPipe) data: AddItemDTO,
    @UserContext() { id: userId }: User,
  ) {
    try {
      const item = await this.cartClient
        .send<any, EventPayload<AddItemDTO>>('UD.Cart.Item.Add', {
          data,
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
