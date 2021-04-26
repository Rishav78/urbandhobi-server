import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Address } from 'node:cluster';
import { User } from 'src/typings';
import { UserContext } from '../decorators';
import { AddAddressDTO } from '../dto';
import { FindAllMS } from '../typings/address';

@Controller()
export class AppController {
  constructor(
    @Inject('ADDRESS_SERVICE') private readonly addressClient: ClientProxy,
  ) {}

  @Put()
  @HttpCode(HttpStatus.CREATED)
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
}
