import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  ParseArrayPipe,
  Patch,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'src/typings';
import { Item, EventPayload, DeleteItem } from '../typings';
import { UserContext } from '../decorators/user.decorator';
import { AddItemDTO, DeleteItemDTO } from '../dto';
import { AuthGuard } from 'src/lib/guards';

@Controller('item')
export class ItemController {
  private readonly logger: Logger = new Logger('ITEM CONTROLLER API');
  constructor(
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deleteItem(
    @Param(ValidationPipe) data: DeleteItemDTO,
    @UserContext() { id: userId }: User,
  ) {
    this.logger.log('deleteItem end');
    try {
      await this.cartClient
        .send<any, EventPayload<DeleteItem>>('UD.Cart.Item.Delete', {
          userId,
          data,
        })
        .toPromise<boolean>();
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('deleteItem end');
    }
  }

  @UseGuards(AuthGuard)
  @Patch()
  public async update() {}

  @UseGuards(AuthGuard)
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
