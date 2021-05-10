import {
  BadRequestException,
  Controller,
  Inject,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RaiseDTO, RequestsDTO, RevokeDTO } from '../dto';
import { Address } from '../typings';
import { RequestService } from '../services';

@Controller()
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    @Inject('ADDRESS_SERVICE') private readonly addressClient: ClientProxy,
  ) {}

  @EventPattern('UD.Laundry.Request.Raise')
  public async raise(
    @Payload(ValidationPipe)
    {
      userId,
      cartId,
      paymentMethod,
      timingId,
      addressId,
      pickupDate,
    }: RaiseDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const address = await this.addressClient
        .send('UD.Address.GetDefaultOrById', { id: addressId, userId })
        .toPromise<Address | null>();
      if (!address) {
        throw new BadRequestException(
          'default/provided address does not exist',
        );
      }
      const res = await this.requestService.add(
        { cartId, paymentMethod, timingId, addressId: address.id, pickupDate },
        userId,
      );
      return res;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @EventPattern('UD.Laundry.Requests')
  public async getRequests(
    @Payload(ValidationPipe)
    { userId }: RequestsDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const res = await this.requestService.findRequests(userId);
      return res;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @EventPattern('UD.Laundry.Request.Revoke')
  public async revoke(
    @Payload(ValidationPipe)
    { userId, id }: RevokeDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.requestService.revoke(id, userId);
      return true;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }

  @EventPattern('UD.Laundry.Request.Delete')
  public async delete(
    @Payload(ValidationPipe)
    { userId, id }: RevokeDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.requestService.delete(id, userId);
      return true;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
