import { Controller, Logger } from '@nestjs/common';
import { EventPattern, RmqContext, Ctx } from '@nestjs/microservices';
import { ServicesService } from '../services';

@Controller()
export class ServicesController {
  private readonly logger: Logger = new Logger('SERVICES CONTROLLER', true);
  constructor(private readonly servicesService: ServicesService) {}

  @EventPattern('UD.Services.Get')
  public async getAll(@Ctx() context: RmqContext) {
    this.logger.log('getAll start');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const services = await this.servicesService.findAll();
      return services;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      channel.ack(originalMsg);
      this.logger.log('getAll end');
    }
  }
}
