import { Controller, Get, Inject, Logger, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JWTAuthGuard, RoleGuard } from 'src/lib/guards';
import { Roles } from '../decorators';

@Controller()
export class AdminRequestController {
  private readonly logger: Logger = new Logger('CART CONTROLLER API');
  constructor(
    @Inject('LAUNDRY_SERVICE') private readonly laundryClient: ClientProxy,
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  @Roles('ADMIN')
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Get()
  public async findAll() {
    try {
      const requests = await this.laundryClient
        .send('UD.Admin.Request.FindAll', {})
        .toPromise();
      return requests;
    } catch (error) {
      throw error;
    }
  }
}
