import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Address } from '../typings/address';
import { User } from 'src/typings';
import { UserContext } from '../decorators';
import { AddAddressDTO } from '../dto';
import { FindAllMS } from '../typings/address';
import { JWTAuthGuard } from 'src/lib/guards';

@Controller()
export class AddressController {
  constructor(
    @Inject('ADDRESS_SERVICE') private readonly addressClient: ClientProxy,
  ) {}

  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Put()
  public async addAddress(
    @UserContext() { id: userId }: User,
    @Body(ValidationPipe) body: AddAddressDTO,
  ) {
    try {
      const address = await this.addressClient
        .send<any, AddAddressDTO & { userId: string }>('UD.Address.Add', {
          ...body,
          userId,
        })
        .toPromise<Address>();
      return address;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(@UserContext() { id: userId }: User) {
    try {
      const addresses = await this.addressClient
        .send<any, FindAllMS>('UD.Address.FindByUserId', { userId })
        .toPromise<Address[]>();
      return addresses;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('default')
  public async defaultAddress(@UserContext() { id: userId }: User) {
    try {
      return 'null';
    } catch (error) {
      throw error;
    }
  }
}
