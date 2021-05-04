import { Controller, ValidationPipe } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AddAddressDTO, FindByIdDTO, UpdateDefaultAddressDTO } from '../dto';
import { AddressService } from '../services';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @EventPattern('UD.Address.Add')
  public async add(
    @Payload(ValidationPipe)
    {
      city,
      country,
      countryCode,
      district,
      email,
      houseno,
      locality,
      postalCode,
      state,
      stateCode,
      title,
      userId,
    }: AddAddressDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const id = await this.addressService.add({
        city,
        country,
        countryCode,
        district,
        email,
        houseno,
        locality,
        postalCode,
        state,
        stateCode,
        title,
        userId,
      });
      const address = this.addressService.findById(id);
      return address;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @MessagePattern('UD.Address.FindByUserId')
  public async findById(
    @Payload(ValidationPipe) { userId }: FindByIdDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const addresses = await this.addressService.findByUserId(userId);
      return addresses;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @MessagePattern('UD.Address.Default.Update')
  public async updateDefaultAddress(
    @Payload(ValidationPipe) { userId, id }: UpdateDefaultAddressDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const addresses = await this.addressService.markDefault(id, userId);
      return addresses;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @MessagePattern('UD.Address.Default')
  public async getDefault(
    @Payload(ValidationPipe) { userId }: FindByIdDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const addresses = await this.addressService.getDefault(userId);
      return addresses;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
