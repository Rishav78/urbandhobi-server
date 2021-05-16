import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JWTAuthGuard, RoleGuard } from 'src/lib/guards';
import { User } from 'src/typings';
import { Roles } from '../decorators';
import { UserContext } from '../decorators/user.decorator';
import { RaiseDTO, RovokeDTO, ScheduleDTO } from '../dto';
import { RaiseEvent, Cart, Request, ScheduleEvent } from '../typings';

@Controller()
export class RequestController {
  private readonly logger: Logger = new Logger('CART CONTROLLER API');
  constructor(
    @Inject('LAUNDRY_SERVICE') private readonly laundryClient: ClientProxy,
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  @Roles('USER')
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Get()
  public async getRequests(@UserContext() { id: userId }: User) {
    try {
      const res = await this.laundryClient
        .send<any, { userId: string }>('UD.Laundry.Requests', {
          userId,
        })
        .toPromise<Request[]>();
      return res;
    } catch (error) {
      throw error;
    }
  }

  @Roles('USER')
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Put('raise')
  public async raise(
    @UserContext() { id: userId }: User,
    @Body(ValidationPipe)
    { paymentMethod }: RaiseDTO,
  ) {
    try {
      const cart = await this.cartClient
        .send('UD.Cart.FindByUserId', userId)
        .toPromise<Cart>();
      if (!cart) {
        throw new NotFoundException('either user or cart does not exist');
      }
      const { id: cartId } = cart;
      const res = await this.laundryClient
        .send<any, RaiseEvent>('UD.Laundry.Request.Raise', {
          cartId,
          userId,
          paymentMethod,
        })
        .toPromise<Request>();
      return res;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JWTAuthGuard)
  @Patch('schedule/:id')
  public async schedule(
    @UserContext() { id: userId }: User,
    @Param(ValidationPipe) { id }: RovokeDTO,
    @Body(ValidationPipe)
    { timingId, addressId, pickupDate }: ScheduleDTO,
  ) {
    try {
      const res = await this.laundryClient
        .send<any, ScheduleEvent>('UD.Laundry.Request.Schedule', {
          id,
          pickupDate,
          addressId,
          timingId,
          userId,
        })
        .toPromise<string>();
      return res;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JWTAuthGuard)
  @Patch('revoke/:id')
  public async revoke(
    @Param() { id }: RovokeDTO,
    @UserContext() { id: userId }: User,
  ) {
    try {
      const res = await this.laundryClient
        .send<any, { userId: string; id: string }>(
          'UD.Laundry.Request.Revoke',
          {
            userId,
            id,
          },
        )
        .toPromise<Request[]>();
      return res;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  public async delete(
    @Param() { id }: RovokeDTO,
    @UserContext() { id: userId }: User,
  ) {
    try {
      const res = await this.laundryClient
        .send<any, { userId: string; id: string }>(
          'UD.Laundry.Request.Delete',
          {
            userId,
            id,
          },
        )
        .toPromise<Request[]>();
      return res;
    } catch (error) {
      throw error;
    }
  }
}
