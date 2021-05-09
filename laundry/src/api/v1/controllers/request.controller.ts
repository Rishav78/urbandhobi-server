import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JWTAuthGuard } from 'src/lib/guards';
import { User } from 'src/typings';
import { UserContext } from '../decorators/user.decorator';
import { RaiseDTO } from '../dto';
import { RaiseEvent, Cart, Request } from '../typings';

@Controller()
export class RequestController {
  private readonly logger: Logger = new Logger('CART CONTROLLER API');
  constructor(
    @Inject('LAUNDRY_SERVICE') private readonly laundryClient: ClientProxy,
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  @UseGuards(JWTAuthGuard)
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

  @UseGuards(JWTAuthGuard)
  @Put('raise')
  public async raise(
    @UserContext() { id: userId }: User,
    @Body(ValidationPipe)
    { timingId, paymentMethod, addressId, pickupDate }: RaiseDTO,
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
          timingId,
          addressId,
          pickupDate,
        })
        .toPromise<string>();
      return res;
    } catch (error) {
      throw error;
    }
  }
}
