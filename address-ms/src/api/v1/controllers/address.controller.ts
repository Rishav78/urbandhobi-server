import { Controller, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AddAddressDTO } from '../dto';
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
      await this.addressService.add({
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
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
