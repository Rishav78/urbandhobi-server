import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';
import { TimingService } from '../services';

@Controller()
export class TimingController {
  private readonly logger: Logger = new Logger(
    'PICKUP TIMINGS CONTROLLER',
    true,
  );
  constructor(private readonly timingService: TimingService) {}

  @EventPattern('UD.Services.PickupTiming')
  public async getTimings(@Ctx() context: RmqContext) {
    this.logger.log('getTimings start');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const timings = await this.timingService.findAll();
      return timings;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      channel.ack(originalMsg);
      this.logger.log('getTimings end');
    }
  }
}
