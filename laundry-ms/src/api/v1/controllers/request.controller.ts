import { Controller, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RaiseDTO, RequestsDTO } from '../dto';
import { RequestService } from '../services';

@Controller()
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @EventPattern('UD.Laundry.Request.Raise')
  public async raise(
    @Payload(ValidationPipe)
    { userId, cartId, paymentMethod, timingId }: RaiseDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const res = await this.requestService.add(
        { cartId, paymentMethod, timingId },
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
}
