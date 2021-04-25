import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  ParseArrayPipe,
  Patch,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'src/typings';
import { Item, EventPayload } from '../typings';
import { UserContext } from '../decorators/user.decorator';
import { AddItemDTO } from '../dto';

@Controller('item')
export class ItemController {
  private readonly logger: Logger = new Logger('ITEM CONTROLLER API');
  constructor(
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  @Put()
  public async addItems(
    @Body(new ParseArrayPipe({ items: AddItemDTO })) data: AddItemDTO[],
    @UserContext() { id: userId }: User,
  ) {
    this.logger.log('addItems start');
    try {
      const item = await this.cartClient
        .send<any, EventPayload<AddItemDTO[]>>('UD.Cart.Items.Add', {
          data,
          userId,
        })
        .toPromise<Item>();
      return item;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('addItems end');
    }
  }

  @Put('s')
  public async addItem(
    @Body(ValidationPipe) data: AddItemDTO,
    @UserContext() { id: userId }: User,
  ) {
    this.logger.log('addItem start');
    try {
      const item = await this.cartClient
        .send<any, EventPayload<AddItemDTO>>('UD.Cart.Item.Add', {
          data,
          userId,
        })
        .toPromise<Item>();
      return item;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('addItem end');
    }
  }

  @Delete()
  public async delete() {}

  @Patch()
  public async update() {}

  @Get('all')
  public async getAll(@UserContext() { id: userId }: User) {
    this.logger.log('getAll start');
    try {
      const item = await this.cartClient
        .send<any, string>('UD.Cart.Items.Get', userId)
        .toPromise<Item[]>();
      return item;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('getAll end');
    }
  }
}
