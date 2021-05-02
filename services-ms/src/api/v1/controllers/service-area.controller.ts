import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';
import { ServiceAreaService } from '../services';

@Controller()
export class ServiceAreaController {
  private readonly logger: Logger = new Logger('SERVICE AREA CONTROLLER', true);
  constructor(private readonly serviceAreaService: ServiceAreaService) {}

  @EventPattern('UD.Services.Area.GetStates')
  public async getStates(@Ctx() context: RmqContext) {
    this.logger.log('getStates start');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const states = await this.serviceAreaService.findStates();
      return states;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      channel.ack(originalMsg);
      this.logger.log('getStates end');
    }
  }

  @EventPattern('UD.Services.Area.GetCountrys')
  public async getCountrys(@Ctx() context: RmqContext) {
    this.logger.log('getCountrys start');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const countrys = await this.serviceAreaService.findCountrys();
      return countrys;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      channel.ack(originalMsg);
      this.logger.log('getCountrys end');
    }
  }
}
