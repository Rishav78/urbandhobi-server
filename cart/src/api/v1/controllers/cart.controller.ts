import {
  Controller,
  Get,
  Inject,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/lib/guards/auth.guard';
import { User } from 'src/typings';
import { UserContext } from '../decorators/user.decorator';
import { Cart } from '../typings';

@Controller()
export class CartController {
  private readonly logger: Logger = new Logger('CART CONTROLLER API');
  constructor(
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Get('user')
  public async findByUserId(@UserContext() { id }: User) {
    try {
      const cart = await this.cartClient
        .send('UD.Cart.FindByUserId', id)
        .toPromise<Cart>();
      return cart;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('submit')
  public async submit(@UserContext() { id: userId }: User) {
    try {
      const cart = await this.cartClient
        .send<any, string>('UD.Cart.Submit', userId)
        .toPromise<Cart>();
      return cart;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
